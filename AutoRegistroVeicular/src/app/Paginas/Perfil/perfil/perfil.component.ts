import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VeiculoService } from '../../../Services/Veiculo.Service';
import { CommonModule } from '@angular/common';
import { VeiculoViewModel } from '../../../Models/VeiculoViewModel';
import { UsuarioService } from '../../../Services/Usuario.Service';
import { UsuarioViewModel } from '../../../Models/UsuarioViewModel';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    this.usuarioService.getUsuario().subscribe(usuario=>{
      this.usuario = usuario;
    })
  }

  carregarVeiculos() {
    this.veiculoService.getVeiculos().subscribe(veiculos => {
      this.veiculos = veiculos;
    });
  }

  abrirDetalhesVeiculo(id: string) {
    this.router.navigate(['/veiculo=', id]); // Redireciona para a página de detalhes
  }

  formularioVeiculo(){
    this.veiculoForm = this.fb.group({
      modelo: ['', Validators.required],
      placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      kmAtual: ['', [Validators.required, Validators.min(0), Validators.max(9999999)]],
      kmTrocaOleo: ['', [Validators.required, Validators.min(0), Validators.max(9999999)]]
    });
  }
  onSubmit() {
    if (this.veiculoForm.valid) {
      console.log('Dados do veículo:', this.veiculoForm.value);
      alert('Veículo cadastrado com sucesso!');
    } else {
      alert('Preencha todos os campos corretamente.');
    }
  }
}
