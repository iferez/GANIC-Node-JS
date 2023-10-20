import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsuarioService } from './services/usuario.service';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

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
    component: LoginComponent
  },
  { path: "**", redirectTo: "home", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
