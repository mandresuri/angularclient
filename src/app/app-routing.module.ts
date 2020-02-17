import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavegacionComponent } from './pages/navegacion/navegacion.component';
import { LoginComponent } from './pages/login/login.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { RegisterComponent } from './pages/register/register.component';
import {MainComponent} from './pages/main/main.component';
import { ListadoClientesComponent } from './pages/listado-clientes/listado-clientes.component';


const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'navegacion', component: NavegacionComponent},
  {path:'clientes', component: ListadoClientesComponent},
  {path:'register', component: RegisterComponent},
  {path:'main', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
