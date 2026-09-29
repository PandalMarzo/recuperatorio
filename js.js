let contactos = [];

const inputNombre = document.getElementById('input-nombre');
const inputTelefono = document.getElementById('input-telefono');
const btnAgregar = document.getElementById('btn-agregar');
const listaContactos = document.getElementById('lista-contactos');
const mensajeVacio = document.getElementById('mensaje-vacio');

function renderizarContactos() {
    listaContactos.innerHTML = '';
    
    if (contactos.length === 0) {
        mensajeVacio.style.display = 'block';
    } else {
        mensajeVacio.style.display = 'none';
    }

    contactos.forEach((contacto) => {
        const divContacto = document.createElement('div');
        divContacto.classList.add('contacto-item');

        const divInfo = document.createElement('div');
        divInfo.classList.add('contacto-info');
        
        const spanNombre = document.createElement('span');
        spanNombre.classList.add('contacto-nombre');
        spanNombre.textContent = contacto.nombre;

        const spanTelefono = document.createElement('span');
        spanTelefono.classList.add('contacto-telefono');
        spanTelefono.textContent = contacto.telefono;

        divInfo.appendChild(spanNombre);
        divInfo.appendChild(spanTelefono);

        divContacto.appendChild(divInfo);
        listaContactos.appendChild(divContacto);
    });
}

function agregarContacto() {
    const nombre = inputNombre.value.trim();
    const telefono = inputTelefono.value.trim();

    if (nombre === '' || telefono === '') {
        alert('Por favor, completa ambos campos (Nombre y Teléfono).');
        return;
    }

    const nuevoContacto = {
        id: Date.now(),
        nombre: nombre,
        telefono: telefono
    };

    contactos.push(nuevoContacto);

    inputNombre.value = '';
    inputTelefono.value = '';
    
    renderizarContactos();
    inputNombre.focus();
}


btnAgregar.addEventListener('click', agregarContacto);

inputNombre.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarContacto();
});
inputTelefono.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarContacto();
});

renderizarContactos();