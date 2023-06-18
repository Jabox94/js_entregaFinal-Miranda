import { cargarDatos } from './js/generarHTML.js';

// Modal para inicio de sesion y crear cuenta
import { modals } from './js/modals.js'

// Modal + Carrito dinamico
import { carrito } from './js/carrito.js';

/*********************** Inicio de programa ***********************/
iniciar();
function iniciar() {
    cargarDatos();
    modals();
    carrito();
}