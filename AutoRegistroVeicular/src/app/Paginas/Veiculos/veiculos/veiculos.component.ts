import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule,FormBuilder,FormGroup, Validators } from '@angular/forms';
import { manutencaoViewModel } from '../../../Models/manutencaoViewModel';
import { VeiculoViewModel } from '../../../Models/VeiculoViewModel';
import { VeiculoService } from '../../../Services/Veiculo.Service';
import { ManutencaoService } from '../../../Services/Manutencao.Service';

@Component({
  selector: 'app-veiculos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './veiculos.component.html',
  styleUrl: './veiculos.component.scss'
})
export class VeiculosComponent implements OnInit {
 empresaNome: string = 'Nome da Empresa';
  manutencoes!:Array<manutencaoViewModel>;
  veiculo!:VeiculoViewModel;
  veiculoForm!: FormGroup;


  constructor(private veiculoService: VeiculoService, private router: Router,
    private manutencaoService: ManutencaoService, private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.carregarManutencoes();
    this.carregarVeiculo();
 
  }

 
  carregarManutencoes(){
    this.manutencaoService.getManutencoes().subscribe(manutencoes=>{
      this.manutencoes = manutencoes;
    })
  }

  carregarVeiculo() {
    this.veiculoService.getVeiculo().subscribe(veiculo => {
      this.veiculo = veiculo;
      this.formularioVeiculo();
    });
  }

  abrirDetalhesVeiculo(id: string) {
    this.router.navigate(['/veiculo', id]); // Redireciona para a página de detalhes
  }

  formularioVeiculo(){
    if(this.veiculo){
      this.veiculoForm = this.fb.group({
        placa: [this.veiculo.Placa, [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
        modelo: [this.veiculo.Modelo, Validators.required],
        kmAtual: [this.veiculo.KmAtual, [Validators.required, Validators.min(0), Validators.max(9999999)]],
        kmTrocaOleo: [this.veiculo.KmTrocaOleo, [Validators.required, Validators.min(1), Validators.max(9999999)]]
      });
    }
  }

  onSubmit(): void {
    if (this.veiculoForm.valid) {
      console.log('Veículo alterado:', this.veiculoForm.value);
      // Aqui você pode enviar os dados para o backend ou atualizar o modelo
    } else {
      console.log('Formulário inválido!');
    }
  }

}
