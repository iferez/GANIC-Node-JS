import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-restablecer-contrasenia',
  templateUrl: './restablecer-contrasenia.component.html',
  styleUrls: ['./restablecer-contrasenia.component.css']
})
export class RestablecerContraseniaComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private Toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private router: Router

  ) {
    this.form = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      pass: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]]
    });
  }

  restablecerContrasenia() {
    const datosEnviar = {
      email: localStorage.getItem('email'),
      codigo: this.form.get('codigo')?.value,
      pass: this.form.get('pass')?.value
    }
    console.table(datosEnviar);

    this._usuarioService.restablecerContrasenia(datosEnviar).subscribe({
      next: (data) => {
        this.Toastr.success('Contraseña restablecida correctamente', 'Contraseña restablecida');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.Toastr.error(error.message, 'Error');
      }
    });

  }

}
