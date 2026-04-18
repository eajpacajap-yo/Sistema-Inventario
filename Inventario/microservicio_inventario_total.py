import requests
import random
from datetime import datetime, timedelta

# URLs de la API
URL_BASE = "http://localhost:8081/api"

def generar_fecha(dias_atras=365):
    fecha = datetime.now() - timedelta(days=random.randint(0, dias_atras))
    return fecha.strftime("%Y-%m-%d")

def cargar_datos():
    print("--- Iniciando Carga Masiva Relacional ---")
    
    # 1. Obtener IDs existentes (Necesitamos proveedores y empleados ya creados)
    try:
        prov_res = requests.get(f"{URL_BASE}/proveedores").json()
        emp_res = requests.get(f"{URL_BASE}/empleados").json()
        
        if not prov_res or not emp_res:
            print("Error: Necesitas tener proveedores y empleados en la BD primero.")
            return
    except Exception as e:
        print(f"Error de conexión: {e}")
        return

    # 2. Crear 100 Facturas primero
    facturas_creadas = []
    for i in range(1, 101):
        data_factura = {
            "numeroFactura": f"FAC-{random.randint(1000, 9999)}-{i}",
            "fecha": generar_fecha(200),
            "proveedor": {"id": random.choice(prov_res)['id']} # Relación ManyToOne
        }
        res = requests.post(f"{URL_BASE}/facturas", json=data_factura)
        if res.status_code == 201:
            facturas_creadas.append(res.json())

    # 3. Crear 500 Activos y asignarlos a las facturas
    activos_creados = []
    estados = ["Disponible", "Asignado", "Baja"]
    nombres_activos = ["Laptop Dell", "Monitor LG", "Silla Ergonómica", "Teclado Mecánico", "Mouse Inalámbrico"]
    
    for i in range(1, 501):
        factura_asignada = random.choice(facturas_creadas)
        data_activo = {
            "codigoSku": f"SKU-{random.randint(100000, 999999)}-{i}",
            "nombre": f"{random.choice(nombres_activos)} Mod.{i}",
            "descripcion": "Equipo de oficina de alta gama",
            "valorCompra": round(random.uniform(50.0, 1500.0), 2),
            "estado": random.choice(estados),
            "fechaAdquisicion": factura_asignada['fecha'],
            "vidaUtilAnios": random.randint(3, 10),
            "factura": {"id": factura_asignada['id']} # Relación con Factura
        }
        res = requests.post(f"{URL_BASE}/activos", json=data_activo)
        if res.status_code == 201:
            activos_creados.append(res.json())

    # 4. Crear 200 Asignaciones (Unir Empleado + Activo)
    for i in range(1, 201):
        activo_random = random.choice(activos_creados)
        if activo_random['estado'] == "Asignado": # Solo asignamos los que marcamos como tal
            data_asig = {
                "fechaAsignacion": generar_fecha(30),
                "observaciones": "Entrega de equipo inicial",
                "activo": {"id": activo_random['id']},
                "empleado": {"id": random.choice(emp_res)['id']}
            }
            requests.post(f"{URL_BASE}/asignaciones", json=data_asig)

    print(f"--- Carga Finalizada ---")
    print(f"Facturas: 100 | Activos: 500 | Asignaciones: 200")

if __name__ == "__main__":
    cargar_datos()