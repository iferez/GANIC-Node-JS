import { Injectable } from '@angular/core';
import { IProducto } from '../interfaces/productos';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IPago } from '../interfaces/pago';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private _carrito: IProducto[];
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this._carrito = [];
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/pago/';
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

  public mostrarCarrito(): void {
    console.log(this._carrito);
  }

  public obtenerCantidadElementos(): number {
    return this._carrito.length;
  }

  generarOrdenPago(ordenPago: IPago): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}pagarOrden`, ordenPago);
  }
}