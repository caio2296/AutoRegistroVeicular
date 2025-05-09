import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ManutencaoService } from '../../../Services/Manutencao.Service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import { manutencaoViewModel } from '../../../Models/manutencaoViewModel';

@Component({
  selector: 'app-manutencoes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manutencoes.component.html',
  styleUrl: './manutencoes.component.scss'
})
export class ManutencoesComponent implements OnInit {
  manutencaoForm!: FormGroup;
  alteracaoForm!: FormGroup;
  mostrarFormularioManutencao: boolean = false;
  private manutencao!: manutencaoViewModel;
  private id!: string;
  /**
   *
   */
  constructor(private fb: FormBuilder,
     private manutencaoService: ManutencaoService,
    private route: ActivatedRoute) {


  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      this.carregarManutencao(this.id);
    });
    this.formularioManutencao();

  }
  formularioManutencao(){
    this.manutencaoForm = this.fb.group({
      nomePeca: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      dataDaCompra: [''],
      dataDaInstalacao: [''],
      fabricante: ['']
    });
  }
  cadastrarManutencao() {
    if (this.manutencaoForm.valid) {
      console.log('Dados da manutenção:', this.manutencaoForm.value);
      alert('Manutenção cadastrado com sucesso!');
    } else {
      alert('Preencha todos os campos corretamente.');
    }
  }

  carregarManutencao(id:string) {
    this.manutencaoService.BuscarManutencaoId(id).subscribe(manutencao =>{
      this.manutencao=manutencao;
      this.formularioAlterarManutencao(this.manutencao);
    })

  }

  formularioAlterarManutencao(manutencao:manutencaoViewModel){
  // Formulário de alteração (Inclui um ID)
  const dataFormatadaCompra = manutencao.dataDaCompra?.substring(0, 10) ?? '';
  const dataFormatadaInstalacao = manutencao.dataDaInstalacao?.substring(0, 10) ?? '';
    this.alteracaoForm = this.fb.group({
      id: [manutencao.id], // ID da manutenção a ser alterada
      nomePeca: [manutencao.nomePeca, Validators.required],
      preco: [manutencao.preco, [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      dataDaCompra: [dataFormatadaCompra], // opcional
      dataDaInstalacao: [dataFormatadaInstalacao], // opcional
      fabricante: [manutencao.fabricante],
    });
  }
  onPrecoChange(event: any) {
    const value = event.target.value.replace(',', '.');
    this.alteracaoForm.get('preco')?.setValue(value);
  }

  onUpdate(): void {
    if (this.alteracaoForm.valid) {
      console.log('Manutenção alterada:', this.alteracaoForm.value);
      // Aqui você pode chamar o serviço para atualizar no backend
      this.manutencaoService.AtualizarManutencao(this.alteracaoForm.value).subscribe({
        next:()=>{
          alert('Manutenção atualizada com sucesso!');
        },
        error: (error)=>{
          console.error("Falha ao atualizar!", error);
          if (error.status === 400 && error.error) {
            alert(`Erro: ${error.error}`);
          } else if (error.status === 500) {
            alert("Erro interno no servidor. Tente novamente mais tarde.");
          } else {
            alert("Erro desconhecido ao atualizar a manutenção.");
          }
        }
      })
    }
  }

  onDelete(): void {
    const id = this.alteracaoForm.get('id')?.value;
    if (id) {
      console.log('Manutenção excluída com ID:', id);
     this.manutencaoService.ExcluirManutencao(id).subscribe({
      next: ()=>{
        alert("Manutenção excluida com sucesso!");
      },
      error: (error)=>{
        console.error("Falha ao atualizar!", error);
        if (error.status === 400 && error.error) {
          alert(`Erro: ${error.error}`);
        } else if (error.status === 500) {
          alert("Erro interno no servidor. Tente novamente mais tarde.");
        } else {
          alert("Erro desconhecido ao atualizar a manutenção.");
        }
      }
     })
    }
  }
}
