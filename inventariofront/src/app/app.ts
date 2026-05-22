import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth';
import { EmpleadosComponent } from './componentes/empleados/empleados';
import { ProveedoresComponent } from './componentes/proveedores/proveedores';
import { ActivosComponent } from './componentes/activos/activos';
import { FacturasComponent } from './componentes/facturas/facturas';
import { AsignacionesComponent } from './componentes/asignaciones/asignaciones';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, EmpleadosComponent, ProveedoresComponent, ActivosComponent, FacturasComponent, AsignacionesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // --- CONTROL DE PESTAÑAS (Asegúrate de tener esto) ---
  pestana: string = 'bienvenida'; 

  cambiarPestana(nuevaPestana: string) {
    this.pestana = nuevaPestana;
  }

  pestanaActiva(): string {
    return this.pestana;
  }

  // --- CONTROL DE LOGIN ---
  sesionIniciada = false;
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService) {
    this.sesionIniciada = this.authService.isLoggedIn();
  }

  onLoginLocal(event: Event): void {
    event.preventDefault();
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.authService.saveUser(response);
        this.sesionIniciada = true;
        this.pestana = 'bienvenida'; // Restablece al menú de inicio al entrar
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error || 'Correo o contraseña incorrectos.';
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.sesionIniciada = false;
  }
}