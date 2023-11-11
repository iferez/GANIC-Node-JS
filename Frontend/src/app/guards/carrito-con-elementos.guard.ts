import { CanActivateFn } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const carritoConElementosGuard: CanActivateFn = () => {
  const carrito = inject(CarritoService); 
  const rout = inject(Router); 

  return !carrito.carrito.length ?  rout.navigate(['/home']) : true;
};
