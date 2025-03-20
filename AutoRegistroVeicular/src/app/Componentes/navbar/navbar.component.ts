import { Component,OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { AutenticaService } from '../../Services/Autentica.Service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  implements OnInit {

  isMenuOpen: boolean = false;
  constructor(private router:Router, private autenticaService: AutenticaService) {
  }
  ngOnInit(): void {
  }
  @HostBinding('class.active') get activeClass() {
    return this.isMenuOpen;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  home(){
    this.router.navigate(["/"]);

  }
  cadastrar(){
    this.router.navigate(["/Cadastro"]);

  }
  login(){
    this.router.navigate(["/Login"]);

  }
  perfil(){
    this.router.navigate(["/Perfil"]);

  }

  estaAutenticado():boolean{
    return this.autenticaService.estaAutenticado();
  }
  sair(){
    this.autenticaService.LimparToken();
    this.router.navigate(["/login"]);
  }
}
