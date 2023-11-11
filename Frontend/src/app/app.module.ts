import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Modulos
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
