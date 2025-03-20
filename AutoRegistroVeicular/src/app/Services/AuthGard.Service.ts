import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { AutenticaService } from './Autentica.Service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private autenticaService: AutenticaService, private router: Router) {}

  canActivate(): boolean {
    if (this.autenticaService.estaAutenticado()) {
      return true;
    } else {
     
      this.router.navigate(['/login']);
      return false;
    }
  }
}