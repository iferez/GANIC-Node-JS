import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthToken(): Observable<boolean>{
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token') ? of(true) : of(false);
  }
}
