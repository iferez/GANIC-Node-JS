import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.getAuthToken().subscribe((token) => {
    if (!token) {
      router.navigate(["/login"]);
      return false; // <== "Usuario no autenticado. Redirigiendo a /login"
    }
    return true; // <== Usuario autenticado
  });
  return true;
};