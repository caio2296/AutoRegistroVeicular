import { Component,OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  implements OnInit {

  isMenuOpen: boolean = false;
  constructor(private router:Router) {
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
}
