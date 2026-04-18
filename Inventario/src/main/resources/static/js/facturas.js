const URL_FAC = "/api/facturas";

async function listar() {
    const res = await fetch(URL_FAC);
    const datos = await res.json();
    const tabla = document.getElementById('lista-facturas');
    tabla.innerHTML = datos.map(f => `
        <tr>
            <td>${f.id}</td>
            <td>${f.numeroFactura}</td>
            <td>${f.fecha}</td>
            <td>${f.proveedor ? f.proveedor.id : 'N/A'}</td>
            <td><button class="btn btn-del" onclick="eliminar(${f.id})">🗑️</button></td>
        </tr>`).join('');
}

async function guardar() {
    const data = {
        numeroFactura: document.getElementById('fac-numero').value,
        fecha: document.getElementById('fac-fecha').value,
        proveedor: { id: document.getElementById('fac-prov-id').value }
    };
    await fetch(URL_FAC, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    listar();
}

async function eliminar(id) {
    await fetch(`${URL_FAC}/${id}`, { method: 'DELETE' });
    listar();
}
listar();