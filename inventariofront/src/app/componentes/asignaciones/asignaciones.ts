import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asignaciones',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './asignaciones.html'
})
export class AsignacionesComponent implements OnInit {
  asignaciones: any[] = [];
  empleados: any[] = [];
  activosDisponibles: any[] = [];
  
  urlBase = 'https://sistema-inventariobienes.onrender.com/api/asignaciones';
  
  nuevoAsignacion = {
    fechaAsignacion: '',
    fechaDevolucion: null,
    observaciones: '',
    empleado: { id: null },
    activo: { id: null }
  };

  editandoId: number | null = null;
  textoBusqueda: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listarTodo();
  }

  listarTodo() {
    // 1. Cargar Asignaciones
    this.http.get(`${this.urlBase}/asignaciones`).subscribe((data: any) => this.asignaciones = data);
    // 2. Cargar Empleados para el select
    this.http.get(`${this.urlBase}/empleados`).subscribe((data: any) => this.empleados = data);
    // 3. Cargar Activos para el select
    this.http.get(`${this.urlBase}/activos`).subscribe((data: any) => {
      // Filtrar solo los disponibles (opcional, según tu lógica de negocio)
      this.activosDisponibles = data.filter((a: any) => a.estado === 'Disponible' || this.editandoId);
    });
  }

  guardar() {
    if (!this.nuevoAsignacion.empleado.id || !this.nuevoAsignacion.activo.id) {
      alert("Seleccione empleado y activo");
      return;
    }

    if (this.editandoId) {
      this.http.put(`${this.urlBase}/asignaciones/${this.editandoId}`, this.nuevoAsignacion).subscribe(() => 
        
        this.reset());
    } else {
      this.http.post(`${this.urlBase}/asignaciones`, this.nuevoAsignacion).subscribe(() => 
        this.reset());
    }
  }

  prepararEdicion(a: any) {
    this.editandoId = a.id;
    this.nuevoAsignacion = {
      fechaAsignacion: a.fechaAsignacion,
      fechaDevolucion: a.fechaDevolucion,
      observaciones: a.observaciones,
      empleado: { id: a.empleado?.id },
      activo: { id: a.activo?.id }
    };
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar asignación?')) {
      this.http.delete(`${this.urlBase}/asignaciones/${id}`).subscribe(() =>  this.listarTodo());
    }
  }

  reset() {
    this.editandoId = null;
    this.nuevoAsignacion = { fechaAsignacion: '', fechaDevolucion: null, observaciones: '', empleado: { id: null }, activo: { id: null } };
    this.listarTodo();
  }

  filtrar() {
    if (!this.textoBusqueda) return this.asignaciones;
    const busq = this.textoBusqueda.toLowerCase();
    return this.asignaciones.filter(a => 
      a.empleado?.nombre.toLowerCase().includes(busq) || 
      a.activo?.nombre.toLowerCase().includes(busq)
    );
  }
}