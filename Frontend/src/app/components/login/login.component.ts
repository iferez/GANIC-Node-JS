import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IUsuarioLogin } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  
  constructor(private fb: FormBuilder,
              private Toastr: ToastrService, 
              private _usuarioService: UsuarioService,
              private router: Router) { 
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required,Validators.maxLength(8),Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    
  }

  iniciarSecion(){
    const usuario: IUsuarioLogin = {
      email: this.form.get('email')?.value,
      password: this.form.get('pass')?.value
    }
    console.log(usuario);
    this._usuarioService.login(usuario).subscribe({
      next: (data) =>{
        this.Toastr.success('Validacion correcta', 'Validacion correcta');
        setTimeout(() => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/home']);
        }, 3000);
      },
      error: (error) =>{
        console.log(error);
        this.Toastr.error('Usuario o contraseña incorrectos', 'Error');
      },
      complete: () =>{
        console.log('Peticion completada');
      }
    });
    this.form.reset();
  }
}
