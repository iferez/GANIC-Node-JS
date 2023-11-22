import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProducto } from 'src/app/interfaces/productos';
import { CarritoService } from 'src/app/services/carrito.service';
import { SandwitchService } from 'src/app/services/sandwitch.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent {
  isSubmitted = false;
  form: FormGroup;
  Preferencias: string[] = ['Todos', 'Clásico', 'Vegetariano', 'Vegano', 'Especial'];
  listaSandwitches: IProducto[] = [];

  constructor( 
               private formBuilder: FormBuilder,
               private _sandwitchService: SandwitchService,
               private _carritoService: CarritoService,
               private Toast: ToastrService
             ) {        
    this.form = this.formBuilder.group({
      preferencia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._sandwitchService.obtenerSandwiches().subscribe({
      next: (v) => this.listaSandwitches = v,
      error: (e: HttpErrorResponse) => this.Toast.error(e.error.mensaje),
      complete: () => console.info('complete')
    });
  }

  actualizarPreferencia(): void{
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    this._sandwitchService.obtenerSandwichesPreferencia(this.form.get('preferencia')?.value).subscribe({
      next: (v) => this.listaSandwitches = v,
      error: (e: HttpErrorResponse) => this.Toast.error(e.error.mensaje),
      complete: () => console.info('complete') 
    });
  }

  hayProductosEnCarrito(): boolean{
    return this._carritoService.carrito.length > 0
  }

  obtenerLongitudCarrito(): number{
    return this._carritoService.carrito.length;
  }
}
