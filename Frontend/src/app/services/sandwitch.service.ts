import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProducto } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class SandwitchService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor( private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/sandwich/';
   }

   getSandwitchesPreferencia(preferencia: string): Observable<IProducto[]> {
      return this.http.post<IProducto[]>(`${this.myAppUrl}${this.myApiUrl}obtenerSandwitchPorClasificacion`, { "clasificacion": preferencia}, { headers: { 'Content-Type': 'application/json' }});
    }

    getSandwitches(): Observable<IProducto[]> {
      return this.http.get<IProducto[]>(`${this.myAppUrl}${this.myApiUrl}listarSandwitch`);
    }
}