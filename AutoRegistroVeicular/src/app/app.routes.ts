import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './Paginas/Home/home/home.component';
import { Component, NgModule } from '@angular/core';
import { CadastroComponent } from './Paginas/Cadastro/cadastro/cadastro.component';
import { LoginComponent } from './Paginas/Login/login/login.component';
import { PerfilComponent } from './Paginas/Perfil/perfil/perfil.component';
import { AuthGuard } from './Services/AuthGard.Service';
import { VeiculosComponent } from './Paginas/Veiculos/veiculos/veiculos.component';
import { ManutencoesComponent } from './Paginas/Manutencoes/manutencoes/manutencoes.component';

export const routes: Routes = [{
    path:"",
    pathMatch:"full",
    redirectTo:"Home"
},{
  path:"home",
  pathMatch:"full",
  redirectTo:"Home"
},{
  path:"cadastro",
  pathMatch:"full",
  redirectTo:"Cadastro"
},
{
  path:"Home", component:HomeComponent
},
{
  path:"Cadastro", component:CadastroComponent
},
{
  path:"Login",component:LoginComponent
},
{
  path:"login",
  pathMatch:"full",
  redirectTo:"Login"
},
{
  path:"Perfil",component:PerfilComponent, canActivate:[AuthGuard]
},
{
  path:"perfil",
  pathMatch:"full",
  redirectTo:"Perfil"
},
{
  path: "Veiculo/:id", // Adicionando parâmetro dinâmico ":id"
  component: VeiculosComponent // Certifique-se de ter o componente correspondente
},
{
  path:"Manutencao/:id",
  component: ManutencoesComponent
}

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }