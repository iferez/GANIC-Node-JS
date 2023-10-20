import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUsuarioRegistro } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  
  loading: boolean = false;
  form: FormGroup;

  constructor( private fb: FormBuilder, 
               private router: Router,
               private _usuarioService: UsuarioService,
               private Toast: ToastrService) {
      this.form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        user: ['', [Validators.required, Validators.minLength(3)]],
        pass: ['', [Validators.required, Validators.minLength(6)]],
        rePass: ['', [Validators.required, Validators.minLength(6)]],
     },
     {
        validators: (form: FormGroup) => {
          const pass = form.get('pass')?.value;
          const rePass = form.get('rePass')?.value;
          return pass === rePass ? null : { passNoIguales: true };
        }
     });
    }

  ngOnInit(): void {
  }
  
  registrarUsuario(){
    console.log(this.form);
    const nuevoUsuario: IUsuarioRegistro = {
      email: this.form.get('email')?.value,
      username: this.form.get('user')?.value,
      password: this.form.get('pass')?.value
    }
    this._usuarioService.crearUsuario(nuevoUsuario).subscribe(data => {
      console.log(data);
      this.Toast.success('Usuario creado correctamente', 'Usuario creado');
      this.router.navigate(['/login']);
    }, (error: any) => {
      console.log(error);
      this.Toast.error('Error al crear el usuario', 'Error');
    });
    this.form.reset();
  }
      
}