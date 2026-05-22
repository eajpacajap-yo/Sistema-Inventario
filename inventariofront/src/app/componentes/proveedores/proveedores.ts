import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './proveedores.html',
  styleUrl: './proveedores.css'
})
export class ProveedoresComponent implements OnInit {
  proveedores: any[] = [];
  url = 'https://sistema-inventariobienes.onrender.com/api/proveedores'; 
  

  nuevoProv = { 
    nombre: '', 
    nit: '', 
    telefono: '' 
  };
  
  editandoId: number | null = null;
  textoBusqueda: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.http.get(this.url).subscribe((data: any) => {
      // Ordenamos por ID para que no "salten" al actualizar
      this.proveedores = data.sort((a: any, b: any) => a.id - b.id);
    });
  }

  guardar() {
    if (this.editandoId) {

      this.http.put(`${this.url}/${this.editandoId}`, this.nuevoProv).subscribe(() => {
         alert('Operacion efectuada con éxito');
        this.listar();
        this.limpiarYRefrescar();

      });
    } else {
      this.http.post(this.url, this.nuevoProv).subscribe(() => {
        alert('Operacion efectuada con éxito');
        this.listar();
        this.limpiarYRefrescar();
      });
    }
  }

  prepararEdicion(p: any) {
    this.editandoId = p.id;
    this.nuevoProv = { 
      nombre: p.nombre, 
      nit: p.nit, 
      telefono: p.telefono 
    };
  }

  eliminar(id: number) {
    if (confirm('¿Desea eliminar este proveedor?')) {
      this.http.delete(`${this.url}/${id}`).subscribe(() => this.listar());
    }
  }

  limpiarYRefrescar() {
    this.editandoId = null;
    this.nuevoProv = { nombre: '', nit: '', telefono: '' };
    this.listar();
  }

  filtrarProveedores() {
  if (!this.textoBusqueda) {
    return this.proveedores;
  }

  return this.proveedores.filter(p => 
    (p.nombre || '')
      .toLowerCase()
      .includes(this.textoBusqueda.toLowerCase())
  );
}
}