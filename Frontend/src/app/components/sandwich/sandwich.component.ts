import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  agregarSandwitchAlCarrito(): void {
    this._carritoService.agregarAlCarrito(this.prod);
    this.Toast.success('Sandwitch agregado al carrito', 'Exito');
  }

}