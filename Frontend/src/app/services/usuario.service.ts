import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUsuario, IUsuarioLogin } from '../interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private myAppUrl: string;
  private myApiUrl: string;
  private islogged: boolean = false;

  constructor( private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/usuarios/';
  }

  crearUsuario(usuario: IUsuario): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}crearUsuario`, usuario);
  }

  login(usuario: IUsuarioLogin): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}logearUsuario`, usuario);
  }

  verificarCodigo(datos: any): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}verificarUsuario`, datos);
  }

  isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  desloguear(): void {
    localStorage.removeItem('token');
  }
}
