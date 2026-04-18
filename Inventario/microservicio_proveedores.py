import requests
import random
import time


URL_PROVEEDORES = "http://localhost:8081/api/proveedores"
CANTIDAD = 1000 

print(f"--- Iniciando Microservicio de Carga de Proveedores ---")


empresas = ["TechLogistics", "Global Supplies", "Sistemas Avanzados S.A.", "Importadora Oriente", "Soluciones IT"]
ciudades = ["Guatemala", "Quetzaltenango", "Escuintla", "Antigua Guatemala", "Petén"]

inicio = time.time()

for i in range(1, CANTIDAD + 1):
    data = {
        "nombre": f"{random.choice(empresas)} #{i}",
        "contacto": f"Gerente {i}",
        "telefono": f"22{random.randint(10,99)}-{random.randint(1000,9999)}",
        "direccion": random.choice(ciudades)
    }
    
    try:
        response = requests.post(URL_PROVEEDORES, json=data)
        if i % 100 == 0:
            print(f"Proveedores cargados: {i}...")
    except Exception as e:
        print(f"Error: {e}")
        break

fin = time.time()
print(f"--- Carga de Proveedores Finalizada ---")
print(f"Tiempo: {fin - inicio:.2f} segundos")