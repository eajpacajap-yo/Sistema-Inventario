import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './activos.html',
  styleUrl: './activos.css'
})
export class ActivosComponent implements OnInit {
  activos: any[] = [];
  url = 'https://sistema-inventariobienes.onrender.com/api/activos';
  
  nuevoActivo = {
    codigoSku: '',
    nombre: '',
    descripcion: '',
    valorCompra: 0,
    estado: 'Disponible',
    fechaAdquisicion: '',
    vidaUtilAnios: 0
  };

  editandoId: number | null = null;
  textoBusqueda: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.http.get(this.url).subscribe((data: any) => {
      this.activos = data.sort((a: any, b: any) => a.id - b.id);
    });
  }

  guardar() {
    if (this.editandoId) {
      this.http.put(`${this.url}/${this.editandoId}`, this.nuevoActivo).subscribe(() => {
        alert('Operacion efectuada con éxito');
        this.limpiarYRefrescar();
      });
    } else {
      this.http.post(this.url, this.nuevoActivo).subscribe(() => {
        alert('Operacion efectuada con éxito');
        this.limpiarYRefrescar();
      });
    }
  }

  prepararEdicion(a: any) {
    this.editandoId = a.id;
    this.nuevoActivo = { 
      codigoSku: a.codigoSku,
      nombre: a.nombre, 
      descripcion: a.descripcion,
      valorCompra: a.valorCompra,
      estado: a.estado,
      fechaAdquisicion: a.fechaAdquisicion,
      vidaUtilAnios: a.vidaUtilAnios
    };
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este activo?')) {
      this.http.delete(`${this.url}/${id}`).subscribe(() => this.listar());
    }
  }

  limpiarYRefrescar() {
    this.editandoId = null;
    this.nuevoActivo = { 
      codigoSku: '', nombre: '', descripcion: '', 
      valorCompra: 0, estado: 'Disponible', 
      fechaAdquisicion: '', vidaUtilAnios: 0 
    };
    this.listar();
  }

  filtrarActivos() {
    if (!this.textoBusqueda) return this.activos;
    return this.activos.filter(a => 
      (a.nombre || '').toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
      (a.codigoSku || '').toLowerCase().includes(this.textoBusqueda.toLowerCase())
    );
  }
}