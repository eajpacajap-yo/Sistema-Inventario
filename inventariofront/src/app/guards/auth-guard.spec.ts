import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Si está logueado, lo deja pasar
  } else {
    router.navigate(['/login']); // Si no, lo expulsa al login
    return false;
  }
};
