const URL_ASIG = "/api/asignaciones";

async function listar() {
    const res = await fetch(URL_ASIG);
    const datos = await res.json();
    const tabla = document.getElementById('lista-asignaciones');
    tabla.innerHTML = datos.map(as => `
        <tr>
            <td>${as.id}</td>
            <td>ID Emp: ${as.empleado ? as.empleado.id : '?'}</td>
            <td>ID Act: ${as.activo ? as.activo.id : '?'}</td>
            <td>${as.fechaAsignacion}</td>
            <td><button class="btn btn-del" onclick="eliminar(${as.id})">🗑️</button></td>
        </tr>`).join('');
}

async function guardar() {
    const data = {
        empleado: { id: document.getElementById('asig-emp-id').value },
        activo: { id: document.getElementById('asig-act-id').value },
        fechaAsignacion: document.getElementById('asig-fecha').value,
        observaciones: document.getElementById('asig-obs').value
    };
    await fetch(URL_ASIG, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    listar();
}

async function eliminar(id) {
    await fetch(`${URL_ASIG}/${id}`, { method: 'DELETE' });
    listar();
}
listar();