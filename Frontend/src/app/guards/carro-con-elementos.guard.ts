import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { inject } from '@angular/core';

export const carroConElementosGuard: CanDeactivateFn<unknown> = (_component, _currentRoute, _currentState, nextState) => {
  const carrito = inject(CarritoService);
  console.log("Carrito con " + carrito.obtenerCantidadElementos() + " elementos");
  if(nextState.url === '/verCarrito' && carrito.obtenerCantidadElementos() == 0){
    console.log("Carrito vacío. No redirigiendo a /verCarrito");
    return false;
  }
  console.log("Carrito con elementos. Redirigiendo");
  return true;
};
