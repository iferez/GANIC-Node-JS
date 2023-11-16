import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {Toast, ToastrService} from "ngx-toastr";

@Injectable()
export class AgregarTokenInterceptor implements HttpInterceptor {

  constructor(
      private router: Router,
      private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if(token){
      const headers = request.headers.set('Authorization', `Bearer ${token}`);
      // Clonar la solicitud y asignar los nuevos encabezados
      request = request.clone({ headers });
    }

    // @ts-ignore
    return next.handle(request).pipe(
        catchError( (err : HttpErrorResponse )=> {
          if(err.status=== 401){
            this.toastr.error(err.message,"Operacion no permitida")
            this.router.navigate(['/login'])
          }
          return throwError(()=> err.message)
        })
    )
  }
}
