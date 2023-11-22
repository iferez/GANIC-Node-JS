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

  olvidarContrasenia(email: string): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}olvidarContrasenia`, {params: {email}});
  }

  restablecerContrasenia(datos: any): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}restablecerContrasenia`, datos);
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

  obtenerUsuario(email: string): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.myAppUrl}${this.myApiUrl}obtenerUsuario`,{params: {email}});
  }
}
