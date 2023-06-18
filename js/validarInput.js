export function validarSesion() {
    //Inputs
    const username = document.querySelector('#username-input');

    //Error
    const error = document.createElement('P');
    error.classList.add('error-mandatory')
    //Donde mostrar
    const mensajeDisplay = username.parentNode;
    //Elemento padre del padre
    const grandParent = mensajeDisplay.parentNode;

    username.addEventListener('input', validacion);

    function validacion(e) {
        console.log(e.target.value);
        if (e.target.name === "username" && !e.target.value.trim()) {
            mostrarMensaje(`El campo ${e.target.name} es obligatorio`);
            return;
        }

        limpiarHTML();
        habilitarBtn();

        setTimeout(() => {
            limpiarHTML();
        }, 3000);
    }

    function mostrarMensaje(mensaje) {
        limpiarHTML();
        error.textContent = mensaje;
        mensajeDisplay.appendChild(error)

    }

    function limpiarHTML() {
        if (mensajeDisplay.querySelector('.error-mandatory')) {
            error.remove();
        } else return;
    }

    function habilitarBtn() {
        const btn = grandParent.querySelector('.modalBtn');
        btn.classList.remove('opacity-50');
        btn.disabled = false;
    }
}

export function validarCreate() {
    // Inputs
    const username = document.getElementById('username-create');
    const email = document.getElementById('email-create');
    const password = document.getElementById('password-create');
    //Form
    const form = document.querySelector('.createForm');

    // Cargar eventos
    username.addEventListener('input', validar);
    email.addEventListener('input', validar);
    password.addEventListener('input', validar);

    // Validar que los inputs contengan informacion y no esten vacios
    function validar(e) {
        if (e.target.name && !e.target.value.trim()) {
            mostrarMensaje(`El campo ${e.target.name} es obligatorio`, e.target.parentElement);
            return;
        }

        if (e.target.name === 'email' && e.target.value.trim()) {
            ValidarEmail(e.target.value.trim(), e.target.parentElement);
            return;
        }

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
    function ValidarEmail(mail, referencia) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            limpiarHTML(referencia);
            email.style.borderWidth = '3px';
            email.style.borderStyle = 'solid';
            email.style.borderColor = "green";

            setTimeout(() => {
                email.style.borderWidth = '0';
            }, 1500);

            return (true)
        }
        mostrarMensaje(`Este formato de email no es valido, pruebe nuevamente`, referencia);
        return (false)

        //Sacado de stackOverflow
    }

    // Almacenar informacion en un array y posteriormente enviarlo a la BD


    function limpiarHTML(referencia) {
        const elemento = referencia.querySelector('.error-mandatory');

        if (elemento) {
            elemento.remove();
        }
    }
}