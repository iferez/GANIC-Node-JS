import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-olvidar-contrasenia',
  templateUrl: './olvidar-contrasenia.component.html',
  styleUrls: ['./olvidar-contrasenia.component.css']
})
export class OlvidarContraseniaComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private Toast: ToastrService,
    private router: Router
  ) { 
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  enviarEmail(){
    const email = this.form.get('email')?.value;
    console.table(email);
    this._usuarioService.olvidarContrasenia(email).subscribe({
      next: (_data) =>{
        this.Toast.success('Se le envio un codigo para restablecer contraseña', 'Email enviado');
        setTimeout(() => {
          localStorage.setItem('email', email);
          this.router.navigate(['/restablecerContrasenia']);
        }, 2000);
      },
      error: (error) =>{
        this.Toast.error(error.message, 'Error');
      }
    });
  }

}
