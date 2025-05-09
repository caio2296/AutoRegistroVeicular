import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../Services/Login.service';
import { Login } from '../../../Models/LoginModel';
import { AutenticaService } from '../../../Services/Autentica.Service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private loginService:LoginService,
    private autenticaService:AutenticaService, private router:Router
  ) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      var dadosLogin = this.loginForm.getRawValue() as Login;

      this.loginService.LoginUsuario(dadosLogin)
      .subscribe({
        next:(token)=>{
        this.autenticaService.DefineToken(token);
        this.router.navigate(["/perfil"]);
        
      },
      error:erro=>{
        alert("Erro no servidor!");
        this.router.navigate(["/"]);
      }});
      // Aqui você pode redirecionar ou chamar um serviço de autenticação
    }
  }
}
