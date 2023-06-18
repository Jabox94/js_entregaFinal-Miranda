import { validarSesion, validarCreate } from './validarInput.js'

// Variables
const icono = document.getElementById('acc-icon');
const openNav = document.getElementById('open-nav');
const closeNav = document.getElementById('close-nav');
// Mobile
const asideNav = document.querySelector('.aside-navbar');
const loginMobile = document.getElementById('loginBtn-mobile');
const createMobile = document.getElementById('createBtn-mobile');
// login
const loginBtn = document.getElementById('loginBtn');
const createBtn = document.getElementById('createBtn');

export function modals() {
    icono.addEventListener('mouseover', modal);
    openNav.addEventListener('click', mobile);
    closeNav.addEventListener('click', mobile);
    loginBtn.addEventListener('click', login);
    createBtn.addEventListener('click', create);
    loginMobile.addEventListener('click', login)
    createMobile.addEventListener('click', create)
    document.addEventListener('DOMContentLoaded', login);
}

function mobile(e) {
    e.preventDefault();

    // Cambio de estado (icono)
    if (e.target.id === 'open-nav') {
        openNav.style.display = 'none';
        closeNav.style.display = 'flex';
        asideNav.classList.toggle('aside-navbar');
        asideNav.classList.toggle('aside-navbar--active');

    } else {
        closeNav.style.display = 'none';
        openNav.style.display = 'flex';
        asideNav.classList.toggle('aside-navbar');
        asideNav.classList.toggle('aside-navbar--active');
    }
}

function modal(e) {
    e.preventDefault();

    const drop = e.target.parentElement.querySelector('.dropdown-menu');
    drop.classList.toggle('dropdown-menu--active');


    drop.addEventListener('mouseleave', modal);
}
function login(e) {
    e.preventDefault();
    // Modal
    const contenedor = document.createElement('DIV');
    contenedor.classList.add('overlay-modal', 'overlay');
    // incersio en html
    const overlayH = document.createElement('article');
    if (contenedor) {
        contenedor.remove();
    }


    overlayH.classList.add('overlay-container');
    overlayH.appendChild(contenedor);
    document.body.appendChild(overlayH);

    const form = document.createElement('form');
    form.classList.add('loginForm');
    form.innerHTML = `
    <img src="./media/brand-logo.png"></img>
        <h4>Inicio de sesion</h4>

        <label name="Username">
        Username
            <input type="text" id="username-input" name="username">
        </label>
        <label name="Password">
        Password
        <input type="password" name="password" id="password-input">
        </label>
        <a href="#" class="forgot">¿Olvidaste tu contraseña?</a>
        <button type="Submit" id="formVerify" class="modalBtn">Verificar</button>
    `
    overlayH.appendChild(form);


    // Cerrar modal
    if (contenedor) {
        validarSesion();
        contenedor.addEventListener('click', () => {
            overlayH.remove();
        });
    }

}

function create(e) {
    e.preventDefault();

    // Modal
    const contenedor = document.createElement('DIV');
    contenedor.classList.add('overlay-modal', 'overlay');
    // incersio en html
    const overlayH = document.createElement('article');
    overlayH.classList.add('overlay-container');
    overlayH.appendChild(contenedor);
    document.body.appendChild(overlayH);

    const form = document.createElement('form');
    form.classList.add('createForm');
    form.innerHTML = `
    <form class="createForm">
    <img src="./media/brand-logo.png"></img>
    <h4>Crear cuenta</h4>

        <label name="Username">
        Username
            <input type="text" name="username" id="username-create"></input> 
        </label>
        <label name="Email">
        Email
            <input type="email" name="email" id="email-create"></input> 
        </label>
        <label name="Password">
        Password
            <input type="password" name="password" id="password-create"></input> 
        </label>
        <div class="btnForm">
            <button type="Submit" id="formSubmit"class="modalBtn">Enviar</button>
            <button id="formReset" class="modalBtn">Reset</button>
        </div>
    </form>
    `
    overlayH.appendChild(form);

    // Cerrar modal
    if (contenedor) {
        validarCreate();
        contenedor.addEventListener('click', () => {
            overlayH.remove();
        });
    }
}