import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Mientras probamos en local, usamos localhost:8080
  private apiUrl = 'http://localhost:8081/api/auth/login';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

  // Guarda el usuario en el navegador para saber que inició sesión
  saveUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Para cerrar sesión más adelante
  logout(): void {
    localStorage.removeItem('currentUser');
  }


  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}