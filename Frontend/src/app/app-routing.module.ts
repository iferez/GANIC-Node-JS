import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { IngesarSandwichComponent } from './components/ingesar-sandwich/ingesar-sandwich.component';
import { OlvidarContraseniaComponent } from './components/olvidar-contrasenia/olvidar-contrasenia.component';
import { VercarritoComponent } from './components/vercarrito/vercarrito.component';
import { VerificarCodigoComponent } from './components/verificar-codigo/verificar-codigo.component';
import { RestablecerContraseniaComponent } from './components/restablecer-contrasenia/restablecer-contrasenia.component';
import { carroConElementosGuard } from './guards/carro-con-elementos.guard';
import { verCarroGuard } from './guards/ver-carro.guard';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full"},
  { path: "home",
    component: HomeComponent 
  },
  { path: "login",
    component: LoginComponent 
  },
  { path: "registrar",
    component: RegistroComponent
  },
  { path: "crearPedido",
    canActivate: [authGuard],
    canDeactivate: [carroConElementosGuard],
    component: ListarProductosComponent

  },
  { path: "verificarCodigo",
    component: VerificarCodigoComponent
  },
  {
    path: "agregarProducto",
    canActivate: [authGuard],
    component: IngesarSandwichComponent
  },
  {
    path: "verCarrito",
    canActivate: [authGuard, verCarroGuard],
    component: VercarritoComponent
  },
  {
    path: "restablecer",
    component: OlvidarContraseniaComponent
  },
  {
    path: "restablecerContrasenia",
    component: RestablecerContraseniaComponent
  },
  { path: "**", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
