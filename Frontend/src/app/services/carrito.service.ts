import { Injectable } from '@angular/core';
import { IProducto } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private _carrito: IProducto[];

  constructor(
  ) {
    this._carrito = [];
  }

  public get carrito(): IProducto[] {
    return this._carrito;
  }

  public agregarAlCarrito(producto: IProducto): void {
    this._carrito.push(producto);
  }

  public eliminarDelCarrito(producto: IProducto): void {
    const index = this._carrito.findIndex(item => item.id === producto.id);
  
    if (index !== -1) {
      this._carrito.splice(index, 1);
    }
  }

  public obtenerMonto(): number {
    return this._carrito.reduce((total, item) => total + Number(item.precio), 0);
  }

  public vaciarCarrito(): void {
    this._carrito = [];
  }
}