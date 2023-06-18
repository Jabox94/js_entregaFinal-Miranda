export function cargarDatos() {
    fetch('db.json')
        .then(respuesta => respuesta.json()).catch(error => console.error('error', error))
        .then(respuesta => filtrarCategoria(respuesta)).catch(error => console.error('error', error));
}

/*
Filtra cursos por categoria, en base en eso, 
genera el HTML dinamicamente en su celda correspondiente.
*/

function filtrarCategoria(cursos) {
    cursos.forEach(curso => {
        if (curso.categoria === 'fotografia') {
            // console.table(curso);
            generarHTML(curso);
        }
        if (curso.categoria === 'cocina') {
            // console.table(curso);
            generarHTML(curso);
        }
        if (curso.categoria === 'programacion') {
            // console.table(curso);
            generarHTML(curso);
        }
    });
}

function generarHTML(entrada) {

    // Definiciones
    const contenedorFoto = document.querySelector('#course-photo');
    const contenedorCocina = document.querySelector('#course-cooking');
    const contenedorCode = document.querySelector('#course-code');

    // Contenedor
    const contenido = document.createElement('a');
    contenido.setAttribute('href', "#");
    contenido.setAttribute('role', "link");

    switch (entrada.categoria) {

        case 'fotografia':
            contenido.innerHTML = `
            <div class="course__card">
                <div class="imagen">
                <img loading="lazy" src="./media/tumbnail/${entrada.id}.webp" alt="${entrada.nombre}">
            </div>
            <div class="info__card">
                <p class="categoria">${entrada.categoria}</p>
                <h4 class="course__title">${entrada.nombre}</h4>
                <p>Precio: <span>$${entrada.precio}</span></p>
                <div class="button-container">
                    <button class="button-cart add-to-cart" data-id="${entrada.id}">Añadir al carrito</button>
                </div>
            </div>
            </div>`;
            contenedorFoto.appendChild(contenido);
            break;

        case 'cocina':

            contenido.innerHTML = `
        <div class="course__card">
            <div class="imagen">
            <img loading="lazy" src="./media/tumbnail/${entrada.id}.webp" alt="${entrada.nombre}">
        </div>
        <div class="info__card">
            <p class="categoria">${entrada.categoria}</p>
            <h4 class="course__title">${entrada.nombre}</h4>
            <p>Precio: <span>$${entrada.precio}</span></p>
            <div class="button-container">
                <button class="button-cart add-to-cart" data-id="${entrada.id}">Añadir al carrito</button>
            </div>
        </div>
        </div>`;
            contenedorCocina.appendChild(contenido);
            break;

        case 'programacion':
            contenido.innerHTML = `
            <div class="course__card">
                <div class="imagen">
                <img loading="lazy" src="./media/tumbnail/${entrada.id}.webp" alt="${entrada.nombre}">
            </div>
            <div class="info__card">
                <p class="categoria">${entrada.categoria}</p>
                <h4 class="course__title">${entrada.nombre}</h4>
                <p>Precio: <span>$${entrada.precio}</span></p>
                <div class="button-container">
                    <button class="button-cart add-to-cart" data-id="${entrada.id}">Añadir al carrito</button>
                </div>
            </div>
            </div>`;
            contenedorCode.appendChild(contenido);
            break;
    }
}