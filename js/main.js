import { filtrarCategoria } from './generarHTML.js';

// Modal para inicio de sesion y crear cuenta
import { modals } from './modals.js';

// Modal + Carrito dinamico
import { carrito } from './carrito.js';

/*********************** Inicio de programa ***********************/
iniciar();
function iniciar() {
    filtrarCategoria();
    carrito();
    modals();
}