import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsuarioService } from './services/usuario.service';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { VerificarCodigoComponent } from './components/verificar-codigo/verificar-codigo.component';
import { IngesarSandwichComponent } from './components/ingesar-sandwich/ingesar-sandwich.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { VercarritoComponent } from './components/vercarrito/vercarrito.component';
import { carritoConElementosGuard } from './guards/carrito-con-elementos.guard';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full"},
  { path: "home", component: HomeComponent },
  { path: "login", 
    providers: [UsuarioService], 
    component: LoginComponent
  },
  { path: "registrar", 
    providers: [UsuarioService], 
    component: RegistroComponent
  },
  { path: "crearPedido",
    canActivate: [authGuard],
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
    canActivate: [authGuard, carritoConElementosGuard],
    component: VercarritoComponent
  },
  { path: "**", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
