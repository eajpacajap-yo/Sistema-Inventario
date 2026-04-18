const URL_PROV = "/api/proveedores";

async function listar() {
    const res = await fetch(URL_PROV);
    const datos = await res.json();
    const tabla = document.getElementById('lista-proveedores');
    tabla.innerHTML = datos.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.contacto}</td>
            <td><button class="btn btn-del" onclick="eliminar(${p.id})">🗑️</button></td>
        </tr>`).join('');
}

async function guardar() {
    const data = {
        nombre: document.getElementById('prov-nombre').value,
        contacto: document.getElementById('prov-contacto').value
    };
    await fetch(URL_PROV, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    listar();
}

async function eliminar(id) {
    if(confirm("¿Eliminar proveedor?")) {
        await fetch(`${URL_PROV}/${id}`, { method: 'DELETE' });
        listar();
    }
}
listar();