import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProducto } from 'src/app/interfaces/productos';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-sandwich',
  templateUrl: './sandwich.component.html',
  styleUrls: ['./sandwich.component.css']
})
export class SandwichComponent {
  @Input() prod: any;

  constructor(
    private _carritoService: CarritoService,
    private Toast: ToastrService
  ) {
  }

  obtenerCarro(): Number{
   return this._carritoService.carrito.length
  }

  agregarSandwitchAlCarrito(): void {
    this._carritoService.agregarAlCarrito(this.prod);
    this.Toast.success('Sandwitch agregado al carrito', 'Exito');
  }

  eliminarDelCarrito(producto: IProducto): void {
    this._carritoService.eliminarDelCarrito(producto);
  }


}