let contactos = [];

const inputNombre = document.getElementById('input-nombre');
const inputTelefono = document.getElementById('input-telefono');
const btnAgregar = document.getElementById('btn-agregar');
const inputBuscar = document.getElementById('input-buscar'); // NUEVO
const listaContactos = document.getElementById('lista-contactos');
const mensajeVacio = document.getElementById('mensaje-vacio');
const contadorSpan = document.getElementById('contador');

function renderizarContactos(filtro = '') {
    listaContactos.innerHTML = '';

    const contactosFiltrados = contactos.filter(contacto => 
        contacto.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    if (contactosFiltrados.length === 0) {
        mensajeVacio.style.display = 'block';
        if (contactos.length > 0) {
            mensajeVacio.textContent = 'No se encontraron contactos con ese nombre.';
        } else {
            mensajeVacio.textContent = 'Todavia no agregaste contactos.';
        }
    } else {
        mensajeVacio.style.display = 'none';
    }

    contactosFiltrados.forEach((contacto) => {
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

        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.textContent = 'Eliminar';
        
        btnEliminar.addEventListener('click', () => {
            eliminarContacto(contacto.id);
        });

        divContacto.appendChild(divInfo);
        divContacto.appendChild(btnEliminar);

        listaContactos.appendChild(divContacto);
    });
}

function actualizarContador() {
    contadorSpan.textContent = contactos.length;
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
    inputBuscar.value = '';
    
    renderizarContactos();
    actualizarContador();
    inputNombre.focus();
}

function eliminarContacto(id) {
    contactos = contactos.filter(contacto => contacto.id !== id);
    renderizarContactos(inputBuscar.value); // Mantenemos el filtro actual
    actualizarContador();
}

btnAgregar.addEventListener('click', agregarContacto);

inputNombre.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarContacto();
});
inputTelefono.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarContacto();
});

inputBuscar.addEventListener('input', (e) => {
    renderizarContactos(e.target.value);

});

renderizarContactos();
actualizarContador();