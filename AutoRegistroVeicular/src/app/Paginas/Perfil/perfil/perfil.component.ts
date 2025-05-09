import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VeiculoService } from '../../../Services/Veiculo.Service';
import { CommonModule } from '@angular/common';
import { VeiculoViewModel } from '../../../Models/VeiculoViewModel';
import { UsuarioService } from '../../../Services/Usuario.Service';
import { UsuarioViewModel } from '../../../Models/UsuarioViewModel';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Console } from 'console';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  empresaNome: string = 'Nome da Empresa';
  veiculos!:Array<VeiculoViewModel>;
  usuario!:UsuarioViewModel;
  veiculoForm!: FormGroup;

  constructor(private veiculoService: VeiculoService, private router: Router,
    private usuarioService: UsuarioService, private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.carregarUsuario();
    this.carregarVeiculos();
    this.formularioVeiculo();
  }

  carregarUsuario(){
    this.usuarioService.obterUsuario().subscribe(usuario=>{
      this.usuario = usuario;
    })
  }

  carregarVeiculos() {
    this.veiculoService.BuscarVeiculosCustomizada().subscribe(veiculos => {
      this.veiculos = veiculos;
      console.log("Veiculos carregados:",this.veiculos);
    });
  }


  abrirDetalhesVeiculo(id: string) {
    console.log("Redirecionando para Veiculo:", id);
    this.router.navigate([`/Veiculo`, id]); // Formato correto para parâmetros dinâmicos
  }

  formularioVeiculo(){
    this.veiculoForm = this.fb.group({
      modelo: ['', Validators.required],
      placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      kmAtual: ['', [Validators.required, Validators.min(0), Validators.max(9999999)]],
      kmTrocaOleo: ['', [Validators.required, Validators.min(0), Validators.max(9999999)]]
    });
  }
  AdicionarVeiculo() {
    if (this.veiculoForm.valid) {
      this.veiculoService.AdicionarVeiculo(this.veiculoForm.value).subscribe({
        next: (res) => {
          console.log("Criado com sucesso", res);
          alert('Veículo cadastrado com sucesso!');
        },
        error: (error) => {
          console.log("falha ao criar!", error);
  
          if (error.status === 400 && error.error) {
            alert(`Erro: ${error.error}`);
          } else if (error.status === 500) {
            alert("Erro interno no servidor. Tente novamente mais tarde.");
          } else {
            alert("Erro desconhecido ao cadastrar o veículo.");
          }
        }
      });
  
      console.log('Dados do veículo:', this.veiculoForm.value);
    } else {
      alert('Preencha todos os campos corretamente.');
    }
  }
}
