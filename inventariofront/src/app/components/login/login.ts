import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.authService.saveUser(response);
        // Cuando sea exitoso, te manda a la pantalla de tus activos/inventario
        // Cambia '/activos' por la ruta real de tu componente de inventario
        this.router.navigate(['/activos']); 
      },
      error: (err) => {
        // Captura el mensaje de error que configuramos en Java
        this.errorMessage = err.error || 'Ocurrió un error al iniciar sesión.';
      }
    });
  }
}