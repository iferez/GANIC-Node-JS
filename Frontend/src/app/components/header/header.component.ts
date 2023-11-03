import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private _authService: AuthService,
    private _usuarioService: UsuarioService ) { 
    
  }
  ngOnInit(): void {
    console.log('Dentro del Header Component')
    console.log('HD: ' + this._usuarioService.isLogged());
  }

  isLogged(): boolean {
    return this._usuarioService.isLogged();
  }

  public salir(): void {
    this._authService.deslogar();
  }

}
