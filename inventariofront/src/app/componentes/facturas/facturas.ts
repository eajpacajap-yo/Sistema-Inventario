import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './facturas.html',
  styleUrl: './facturas.css'
})
export class FacturasComponent implements OnInit {
  facturas: any[] = [];
  proveedores: any[] = []; // Para llenar el select
  
  urlFacturas = 'https://sistema-inventariobienes.onrender.com/api/facturas';
  urlProveedores = 'https://sistema-inventariobienes.onrender.com/api/proveedores';
  
  nuevoFactura = {
    numeroFactura: '',
    fecha: '',
    proveedor: { id: null } // Objeto para la relación
  };

  editandoId: number | null = null;
  textoBusqueda: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listarFacturas();
    this.listarProveedores();
  }

  listarFacturas() {
    this.http.get(this.urlFacturas).subscribe((data: any) => {
      this.facturas = data.sort((a: any, b: any) => a.id - b.id);
    });
  }

  listarProveedores() {
    this.http.get(this.urlProveedores).subscribe((data: any) => {
      this.proveedores = data;
    });
  }

  guardar() {
    // Validar que se seleccionó un proveedor
    if (!this.nuevoFactura.proveedor.id) {
      alert("Por favor seleccione un proveedor");
      return;
    }

    if (this.editandoId) {
      this.http.put(`${this.urlFacturas}/${this.editandoId}`, this.nuevoFactura).subscribe(() => {
        alert('Operacion efectuada con éxito');
        this.limpiarYRefrescar();
      });
    } else {
      this.http.post(this.urlFacturas, this.nuevoFactura).subscribe(() => {
        alert('Operacion efectuada con éxito');
        this.limpiarYRefrescar();
      });
    }
  }

  prepararEdicion(f: any) {
    this.editandoId = f.id;
    this.nuevoFactura = { 
      numeroFactura: f.numeroFactura,
      fecha: f.fecha,
      proveedor: { id: f.proveedor ? f.proveedor.id : null }
    };
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar esta factura?')) {
      this.http.delete(`${this.urlFacturas}/${id}`).subscribe(() => this.listarFacturas());
    }
  }

  limpiarYRefrescar() {
    this.editandoId = null;
    this.nuevoFactura = { numeroFactura: '', fecha: '', proveedor: { id: null } };
    this.listarFacturas();
  }

  filtrarFacturas() {
    if (!this.textoBusqueda) return this.facturas;
    return this.facturas.filter(f => 
      f.numeroFactura.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
      (f.proveedor?.nombre || '').toLowerCase().includes(this.textoBusqueda.toLowerCase())
    );
  }
}
