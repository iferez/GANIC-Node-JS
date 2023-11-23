import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPago } from 'src/app/interfaces/pago';
import { CarritoService } from 'src/app/services/carrito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {

  form: FormGroup;

  constructor(
    private _carritoService: CarritoService,
    private _usuarioService: UsuarioService,
    private _router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
   }

  ngOnInit(): void {
    const email = localStorage.getItem('email') as string;
    this._usuarioService.obtenerUsuario(email).subscribe(
      {
        next: usuario => this.form.get('titular')?.setValue(`${usuario.nombre} ${usuario.apellido}`),
        error: error => console.log(error.message)
      }
    )
  }

  pagarCarrito(): void {
    const pago: IPago = {
      email: localStorage.getItem('email') as string,
      monto: this._carritoService.obtenerMonto(),
      listaProductos: this._carritoService.carrito.map(item => {
          return {
            nombre: item.nombre,
            precio: item.precio
          }
        })
    }
    this._carritoService.generarOrdenPago(pago).subscribe({
      next: _data => {
        this.toastr.success('Pago realizado con éxito', 'Éxito');
        setTimeout(() => {
          this._carritoService.vaciarCarrito();
          this._router.navigate(['/home']);
        }, 2000);
      },
      error: error => {
        console.log(error.message);
        this.toastr.error('Error al pagar el carrito', 'Error');
      }
    });
  }

}
