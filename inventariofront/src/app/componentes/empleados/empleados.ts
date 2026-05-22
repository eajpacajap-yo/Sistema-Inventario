import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './empleados.html',
  styleUrl: './empleados.css'
})
export class EmpleadosComponent implements OnInit {

  textoBusqueda: string = '';

  empleados: any[] = [];
  url = 'https://sistema-inventariobienes.onrender.com/api/empleados';
  
  // Objeto para el formulario 
  nuevoEmpleado = { nombre: '', departamento: '', correo: '' };
  editandoId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.http.get(this.url).subscribe((data: any) => {
      this.empleados = data;
    });
  }

  guardar() {
    if (this.editandoId) {
      this.http.put(`${this.url}/${this.editandoId}`, this.nuevoEmpleado).subscribe(() => {
        alert('Operacion efectuada con éxito');
        this.listar();

        
        this.editandoId = null;

        this.nuevoEmpleado.nombre = '';
        this.nuevoEmpleado.departamento = '';
        this.nuevoEmpleado.correo = '';

      });
    } else {
      this.http.post(this.url, this.nuevoEmpleado).subscribe(() => {
        alert('Operacion efectuada con éxito');
        this.listar();
        this.nuevoEmpleado.nombre = '';
        this.nuevoEmpleado.departamento = '';
        this.nuevoEmpleado.correo = '';
      });
    }
  }

  prepararEdicion(emp: any) {
    this.editandoId = emp.id;
    this.nuevoEmpleado = { nombre: emp.nombre, departamento: emp.departamento, correo: emp.correo };
  }

  eliminar(id: number) {
    if (confirm('¿Seguro?')) {
      this.http.delete(`${this.url}/${id}`).subscribe(() => this.listar());
    }
  }

  resetear() {
    this.editandoId = null;
    this.nuevoEmpleado.nombre = '';
    this.nuevoEmpleado.departamento = '';
    this.nuevoEmpleado.correo = '';
  }



filtrarEmpleados() {

  if (!this.textoBusqueda) {
    return this.empleados;
  }

  // Si hay texto, filtramos ignorando mayúsculas y minúsculas
  return this.empleados.filter(e => 
    e.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase())
  );
}
 
limpiarYRefrescar() {
  this.resetear();
}

}


