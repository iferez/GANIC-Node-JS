import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.getAuthToken().subscribe((token) => {
    if (!token) {
      console.log("Usuario no autenticado. Redirigiendo a /login");
      router.navigate(["/login"]);
      return false;
    }
    console.log("Usuario autenticado.");
    return true;
  });
  return true;
};