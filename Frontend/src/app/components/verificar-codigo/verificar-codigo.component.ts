import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUsuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-verificar-codigo',
  templateUrl: './verificar-codigo.component.html',
  styleUrls: ['./verificar-codigo.component.css']
})
export class VerificarCodigoComponent {

  form: FormGroup;

  constructor( private fb: FormBuilder, 
               private router: Router,
               private _usuarioService: UsuarioService,
               private Toast: ToastrService) {
      this.form = this.fb.group({
        codigo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
     });
  }

  verificarCodigo(){
    console.log('DATOS OBTENIDOS DEL FORM ==> ',this.form);
    const datosEnviar = {
      email: localStorage.getItem('email'),
      codigo: this.form.get('codigo')?.value
    }
    this._usuarioService.verificarCodigo(datosEnviar).subscribe({
      next: (data) =>{
        this.Toast.success('Codigo verificado correctamente', 'Codigo verificado');
        localStorage.setItem('token', data.token);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) =>{
        this.Toast.error(error.error.message, 'Error');
      }
    });
  }
}