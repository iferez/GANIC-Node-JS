import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProducto } from 'src/app/interfaces/productos';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-vercarrito',
  templateUrl: './vercarrito.component.html',
  styleUrls: ['./vercarrito.component.css']
})
export class VercarritoComponent {
  listaCarrito: IProducto[];

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private Toastr: ToastrService,
  ) {
    this.listaCarrito = [];
  }

  ngOnInit() {
    this.listaCarrito = this.carritoService.carrito;
  }

  obtenerMonto(): number {
    return Number(this.carritoService.obtenerMonto());
  }

  eliminarDelCarrito(producto: IProducto): void {
    this.carritoService.eliminarDelCarrito(producto);
    this.ngOnInit()
  }

  varciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.Toastr.success('Carrito vaciado', 'Carrito vaciado');
    this.router.navigate(['/crearPedido']);
  }

  obtenerCantidadElementos(): number {
    return this.carritoService.obtenerCantidadElementos();
  }

  pagarCarrito(): void {
    this.Toastr.success('Compra realizada con exito', 'Compra realizada');
    setTimeout(() => {
      this.carritoService.mostrarCarrito();
      this.carritoService.vaciarCarrito();
      this.router.navigate(['/home']);
    }, 1000);
  }
}
