import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Modulos
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AgregarTokenInterceptor } from "./utils/agregar-token.interceptor";

// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SliderComponent } from './components/slider/slider.component';
import { VerificarCodigoComponent } from './components/verificar-codigo/verificar-codigo.component';
import { IngesarSandwichComponent } from './components/ingesar-sandwich/ingesar-sandwich.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { SandwichComponent } from './components/sandwich/sandwich.component';
import { VercarritoComponent } from './components/vercarrito/vercarrito.component';
import { OlvidarContraseniaComponent } from './components/olvidar-contrasenia/olvidar-contrasenia.component';
import { RestablecerContraseniaComponent } from './components/restablecer-contrasenia/restablecer-contrasenia.component';
import { PagoComponent } from './components/pago/pago.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    SliderComponent,
    VerificarCodigoComponent,
    IngesarSandwichComponent,
    ListarProductosComponent,
    SandwichComponent,
    VercarritoComponent,
    OlvidarContraseniaComponent,
    RestablecerContraseniaComponent,
    PagoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AgregarTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
