export function validarSesion() {
    //Inputs
    const username = document.getElementById('username-input');
    const password = document.getElementById('password-input');
    const submit = document.getElementById('formVerify');
    const form = document.querySelector('.loginForm');

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [{ username: 'admin', email: 'admin@admin.me', password: '1234' }];
    /**************************** DOM SCRIPT ****************************/
    // Spinner
    const spinnerContainer = document.createElement('DIV');
    spinnerContainer.classList.add('spinnerContainer');
    spinnerContainer.innerHTML = `
    <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    </div>`;

    cargarEventos()
    function cargarEventos() {
        submit.addEventListener('click', validar);
    }

    function validar(e) {
        e.preventDefault();
        let inputUsername = username.value;
        let inputPassword = password.value;
        // Tomamos los valores de los inputs,
        // Con base en eso, busacamos mediante el input el username que coincida con dicho valor
        const cuentaRescatada = usuarios.find(usuario => usuario.username === inputUsername);
        //Filtramos su contraseña, extraida del objeto usuario
        const passwordUsuario = cuentaRescatada.password;


        //Realizamos al comparacion
        if (passwordUsuario === inputPassword) {
            form.appendChild(spinnerContainer);
            setTimeout(() => {
                spinnerContainer.remove();
                Swal.fire({
                    icon: 'success',
                    title: '¡Genial!',
                    text: 'Se ha realizado el login correctamente'
                });
            }, 2000);
            return;
        } else {
            form.appendChild(spinnerContainer);
            setTimeout(() => {
                spinnerContainer.remove();
                Swal.fire({
                    icon: 'error',
                    title: 'Login incorrecto',
                    text: 'Pruebe de nuevo'
                });
            }, 2000);
            return;
        }
    }
    //Fin del programa
}



export function validarCreate() {
    // Inputs
    const username = document.getElementById('username-create');
    const email = document.getElementById('email-create');
    const password = document.getElementById('password-create');
    const submitBtn = document.getElementById('formSubmit');
    const resetBtn = document.getElementById('formReset');
    //Form
    const form = document.querySelector('.createForm');
    //Array de usuarios
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [{ username: 'admin', email: 'admin@admin.me', password: '1234' }];
    // Maqueta de usuario
    let usuario = { username: '', email: '', password: '' };

    /**************************** DOM SCRIPT ****************************/
    // Spinner
    const spinnerContainer = document.createElement('DIV');
    spinnerContainer.classList.add('spinnerContainer');
    spinnerContainer.innerHTML = `
     <div class="spinner">
         <div class="double-bounce1"></div>
         <div class="double-bounce2"></div>
     </div>`;



    cargarEventos();
    function cargarEventos() {
        username.addEventListener('input', validar);
        email.addEventListener('input', validar);
        password.addEventListener('input', validar);
        submitBtn.addEventListener('click', comprobarUsuario);
        resetBtn.addEventListener('click', formReset);
    }

    // Validar que los inputs contengan informacion y no esten vacios
    function validar(e) {
        console.table(usuarios);
        if (e.target.value.trim() === '') {
            mostrarMensaje(`El campo ${e.target.name} es obligatorio`, e.target.parentElement);
            //Reinicia valores
            usuario[e.target.name] = '';
            return;
        }

        if (e.target.name === 'email' && !ValidarEmail(e.target.value.trim())) {
            mostrarMensaje(`El formato de email no es valido`, e.target.parentElement);
            //Reinicia valores
            usuario[e.target.name] = '';
            return;
        }

        limpiarHTML(e.target.parentElement);
        // Se asigna al objeto usuario, los valores correspondientes
        usuario[e.target.name] = e.target.value.trim().toLowerCase();
    }

    function comprobarUsuario(e) {
        e.preventDefault();

        if (Object.values(usuario).includes('')) {

            form.appendChild(spinnerContainer);

            setTimeout(() => {
                //Llamar sweet alert
                spinnerContainer.remove();
                Swal.fire({
                    icon: 'error',
                    title: '¡Cuidado!',
                    text: 'Verifique que no este ningún campo vacío',
                    footer: '<a href="#">Why do I have this issue?</a>'
                })
            }, 3000);
            return;
        } else {
            form.appendChild(spinnerContainer);

            setTimeout(() => {
                spinnerContainer.remove();
                // Verifica que no hayan correos ni usuarios duplicados
                if (!duplicados(usuario)) {
                    almacenarUsuario(usuario);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Muy bien!',
                        text: '¡Su cuenta ha sido creada!'
                    });
                    form.reset();
                }

            }, 3000);
        }
        return;
    }

    //Se genera un mensaje en el formulario
    function mostrarMensaje(mensaje, referencia) {

        limpiarHTML(referencia);

        const contenedor = document.createElement('P');
        contenedor.classList.add('error-mandatory');
        contenedor.textContent = mensaje;
        referencia.appendChild(contenedor);

        //Elimina el mensaje despues de 3s
        setTimeout(() => {
            contenedor.remove();
        }, 3000);
    }

    // Regex para email
    function ValidarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);

        return resultado;
        //Sacado de stackOverflow
    }

    function formReset(e) {
        e.preventDefault();

        Swal.fire({
            title: '¿Estás seguro¡',
            text: "No seras capaz de revertirlo.",
            icon: 'warning',
            width: '50rem',
            padding: '5rem 0',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borra todo'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Eliminado!',
                    'Se ha eliminado tu informacion',
                    'success'
                )
                for (let item in usuario) {
                    //Limpia cada item del objeto
                    email[item] = '';
                    //Reincia el formulario
                    form.reset();
                }
            }
        });



    }

    function limpiarHTML(referencia) {
        const elemento = referencia.querySelector('.error-mandatory');

        if (elemento) {
            elemento.remove();
        }
    }

    function duplicados(input) {
        const usuarioExiste = usuarios.some(usuario => usuario.username === input.username)
        const emailExiste = usuarios.some(usuario => usuario.email === input.email)

        if (usuarioExiste) {
            mostrarMensaje(`Este usuario ya ha sido utilizado`, username.parentElement);
            return true;
        }
        if (emailExiste) {
            mostrarMensaje(`Este email ya ha sido utilizado`, email.parentElement);
            return true;
        }
        return false;

    }

    function almacenarUsuario(usuario) {
        //Una vez pasado todos los filtros, se genera el usuario nuevo y se envia a la "BD"
        let newUsuario = {
            username: usuario.username,
            email: usuario.email,
            password: usuario.password
        }

        // Agrega el nuevo usuario al array de usuarios
        usuarios = [...usuarios, newUsuario];
        console.table(usuarios);

        // Sincronizar con localStorage
        let usuariosRegistrados = JSON.stringify(usuarios);
        localStorage.clear();
        localStorage.setItem("usuarios", usuariosRegistrados);

        form.reset();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

}