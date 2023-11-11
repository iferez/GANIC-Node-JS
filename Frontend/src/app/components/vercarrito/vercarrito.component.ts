import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProducto } from 'src/app/interfaces/productos';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-vercarrito',
  templateUrl: './vercarrito.component.html',
  styleUrls: ['./vercarrito.component.css']
})
export class VercarritoComponent {
  listaCarrito: IProducto[];

  constructor(private carritoService: CarritoService, private router: Router) {
    this.listaCarrito = [];
  }

  ngOnInit() {
    this.listaCarrito = this.carritoService.carrito;
    console.log(this.listaCarrito);
  }

  obtenerMonto(): number {
    let monto = Number(this.carritoService.obtenerMonto());
    return monto;
  }

  eliminarDelCarrito(producto: IProducto): void {
    this.carritoService.eliminarDelCarrito(producto);
    this.ngOnInit()
  }

  varciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.listaCarrito = [];
    this.router.navigate(['/home']);
  }

}
