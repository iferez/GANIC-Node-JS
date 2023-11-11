import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthToken(): Observable<boolean>{
    return localStorage.getItem('token') ? of(true) : of(false);
  }

  deslogar(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
}
