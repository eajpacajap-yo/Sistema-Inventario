const URL_EMPLEADOS = "/api/empleados";

async function listar() {
    const res = await fetch(URL_EMPLEADOS);
    const datos = await res.json();
    const tabla = document.getElementById('lista-empleados');
    tabla.innerHTML = datos.map(e => `
       <tr>
        <td>${e.id}</td>
        <td>${e.nombre}</td>
        <td>${e.departamento}</td>
        <td>
            <button class="btn btn-edit" onclick="prepararEdicion(${e.id}, '${e.nombre}', '${e.departamento}')">Editar</button>
            <button class="btn btn-del" onclick="eliminar(${e.id})">Eliminar</button>
        </td>
    </tr>`).join('');
}

async function guardar() {
    const data = {
        nombre: document.getElementById('emp-nombre').value,
        departamento: document.getElementById('emp-depto').value
    };

    const metodo = editandoId ? 'PUT' : 'POST';
    const url = editandoId ? `${URL_EMPLEADOS}/${editandoId}` : URL_EMPLEADOS;

    await fetch(url, {
        method: metodo,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    // Limpiamos campos
    editandoId = null;
    document.getElementById('emp-nombre').value = "";
    document.getElementById('emp-depto').value = "";
    
    const btnRegistrar = document.querySelector('.btn-add');
    btnRegistrar.innerText = "Registrar";
    btnRegistrar.style.backgroundColor = "#27ae60";

    listar();
}

async function eliminar(id) {
    if(confirm("¿Eliminar empleado?")) {
        await fetch(`${URL_EMPLEADOS}/${id}`, { method: 'DELETE' });
        listar();
    }
}
listar();

// Variable global para saber si estamos editando
let editandoId = null;

function prepararEdicion(id, nombre, departamento) {
    editandoId = id;
    document.getElementById('emp-nombre').value = nombre;
    document.getElementById('emp-depto').value = departamento;
    
    
    const btnRegistrar = document.querySelector('.btn-add');
    btnRegistrar.innerText = "Actualizar Cambios";
    btnRegistrar.style.backgroundColor = "#f39c12"; 
}