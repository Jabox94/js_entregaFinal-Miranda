// variables
// Funcionalidad del modal
const cartIcon = document.querySelector('#cart-icon');
const closeCart = document.querySelector('.close__cart');
const modalCarrito = document.querySelector('.container__cart-products');

// Agregar y quitar cursos a la lista de carrito
const listaCarrito = document.querySelector('#cart-list__items');
const vaciarCarrito = document.querySelector('#empty-cart');
const listadoCursos = document.querySelector('#course-list');


export function carrito() {
    // Array principal
    let articulosCarrito = [];

    cargarEventos();
    function cargarEventos() {
        cartIcon.addEventListener('click', () => {
            modalCarrito.classList.toggle('container__cart-products--active');
        });
        closeCart.addEventListener('click', () => {
            modalCarrito.classList.toggle('container__cart-products--active');
        });

        modalCarrito.addEventListener('click', eliminarCurso);

        listadoCursos.addEventListener('click', agregarCurso);

        vaciarCarrito.addEventListener('click', () => {
            articulosCarrito = [];
            localStorage.clear();
            limpiarHTML();
            contadorHTML();
        });

        document.addEventListener('DOMContentLoaded', () => {
            articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carritoHTML();
        })
    }

    function eliminarCurso(e) {
        if (e.target.classList.contains('btnDelete')) {
            const cursoID = e.target.parentElement.getAttribute('data-id');

            articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);
            carritoHTML();
            contadorHTML();
            sincronizarStorage();
        }
    }

    function agregarCurso(a) {
        a.preventDefault();
        if (a.target.classList.contains('add-to-cart')) {
            const cursoSeleccionado = a.target.parentElement.parentElement.parentElement;
            leerDatoCurso(cursoSeleccionado);
        }
    }

    function leerDatoCurso(curso) {
        // crear un objeto para almacenar los datos leidos del curso
        const infoCurso = {
            imagen: curso.querySelector('div.imagen img').getAttribute('src'),
            nombre: curso.querySelector('div.info__card h4').textContent,
            precio: curso.querySelector('div.info__card p span').textContent,
            id: curso.querySelector('.info__card .button-container button').getAttribute('data-id'),
            cantidad: 1
        }

        // Verifica si hay items en el carrito que esten repetidos
        const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
        if (existe) {
            // Actualiza cantidad
            const cursos = articulosCarrito.map(curso => {
                if (curso.id === infoCurso.id) {
                    curso.cantidad++;
                    return curso;
                } else {
                    return curso;
                }
            });
            articulosCarrito = [...cursos];
        } else {
            // Agregar elementos al arreglo para luego enviarlo a la lista del carrito
            articulosCarrito = [...articulosCarrito, infoCurso];
        }
        carritoHTML();
    }

    function carritoHTML() {
        // const contadorHTML = document.querySelector('.cart__items-counter');

        // Limpiar el HTML
        limpiarHTML();

        // Recorre el carrito y genera el HTML
        articulosCarrito.forEach(curso => {
            const { imagen, nombre, precio, cantidad, id } = curso;
            const contenido = document.createElement('div');
            contenido.classList.add('inner__item-container');
            contenido.setAttribute('data-id', `${id}`);

            contenido.innerHTML = `
                <div class="item-img">
                    <img src="${imagen}" alt="${nombre}">
                </div>
                <div class="item-name">
                ${nombre}
                </div>
                <div class="item-price">
                ${precio}
                </div>
                <div class="item-q">
                ${cantidad}
                </div>
                <p class="btnDelete">X</p>
                `;

            listaCarrito.appendChild(contenido);
        });

        if (articulosCarrito.length > 0) {
            // Itera en el array para contar la cantidad de cursos (no unicos) que hay en el carrito
            contadorHTML();
            // Almacena el carrito en el Local Storage
            sincronizarStorage();
        }
    }

    function contadorHTML() {
        // variables
        const contador = document.getElementById('cart-counter');
        let iterador = 0;

        if (articulosCarrito.length >= 1) {
            // Funciones
            articulosCarrito.forEach(curso => {
                iterador += curso.cantidad;
                contador.textContent = `${iterador}`;
            })
            return;
        }

        //En caso de estar vacio o eliminar los articulos del carrito, se reinicia el contador
        // Y se actualiza el HTML
        iterador = 0;
        contador.textContent = `${iterador}`;
    }

    function limpiarHTML() {
        listaCarrito.innerHTML = '';
    }

    function sincronizarStorage() {
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
    }
}