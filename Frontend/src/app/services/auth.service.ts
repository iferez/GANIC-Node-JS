import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthToken(): Observable<boolean>{
    return localStorage.getItem('token') ? of(true) : of(false);
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token') as string;
    const decodedToken = jwtDecode(token) as IToken;
    return decodedToken.rol === 'Administrador';
  }

  deslogar(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
}
