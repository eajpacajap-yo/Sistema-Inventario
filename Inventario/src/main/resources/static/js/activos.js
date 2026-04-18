const URL_ACTIVOS = "/api/activos";

async function listar() {
    const res = await fetch(URL_ACTIVOS);
    const datos = await res.json();
    const tabla = document.getElementById('lista-activos');
    tabla.innerHTML = datos.map(a => `
        <tr>
            <td>${a.codigoSku}</td>
            <td>${a.nombre}</td>
            <td>$${a.valorCompra}</td>
            <td><strong>${a.estado}</strong></td>
            <td><button class="btn btn-del" onclick="eliminar(${a.id})">🗑️</button></td>
        </tr>`).join('');
}

async function guardar() {
    const data = {
        codigoSku: document.getElementById('act-sku').value,
        nombre: document.getElementById('act-nombre').value,
        valorCompra: document.getElementById('act-valor').value,
        estado: document.getElementById('act-estado').value
    };
    await fetch(URL_ACTIVOS, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    listar();
}

async function eliminar(id) {
    if(confirm("¿Eliminar activo?")) {
        await fetch(`${URL_ACTIVOS}/${id}`, { method: 'DELETE' });
        listar();
    }
}
listar();