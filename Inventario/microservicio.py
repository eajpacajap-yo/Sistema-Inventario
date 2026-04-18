import requests
import random
import time

# Configuración
URL = "http://localhost:8081/api/empleados"
TOTAL_REGISTROS = 5000

print(f"Iniciando carga masiva de {TOTAL_REGISTROS} registros...")

# Registro especial prueba de autoría 
mi_registro = {
    "nombre": "Josias Ajpacajá Poncio",
    "departamento": "Sistemas - Prueba de Estrés",
    "correo": "eajpacajap@miumg.edu.gt"
}

# Enviar nombre primero
requests.post(URL, json=mi_registro)

# Carga masiva de los otros registros
inicio_tiempo = time.time()

for i in range(1, TOTAL_REGISTROS):
    data = {
        "nombre": f"Empleado Genérico {i}",
        "departamento": random.choice(["RRHH", "Finanzas", "Sistemas", "Ventas", "Logística"]),
        "correo": f"empleado{i}@empresa.com"
    }
    
    try:
        response = requests.post(URL, json=data)
        if i % 500 == 0:
            print(f"Progreso: {i} registros insertados...")
    except Exception as e:
        print(f"Error en el registro {i}: {e}")
        break

fin_tiempo = time.time()
print(f"¡Carga finalizada!")
print(f"Tiempo total: {fin_tiempo - inicio_tiempo:.2f} segundos")