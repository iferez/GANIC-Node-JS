import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor( private _authService: AuthService,
    private _usuarioService: UsuarioService ) { 
    
  }

  isLogged(): boolean {
    return this._usuarioService.isLogged();
  }

  public salir(): void {
    this._authService.deslogar();
  }

  public isAdmin(): boolean {
    return this._authService.isAdmin();
  }

}
