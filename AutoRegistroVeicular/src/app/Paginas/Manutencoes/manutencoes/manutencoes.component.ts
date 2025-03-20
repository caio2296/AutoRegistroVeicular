import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';

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

  /**
   *
   */
  constructor(private fb: FormBuilder) {


  }
  ngOnInit(): void {
    this.formularioManutencao();
  }
  formularioManutencao(){
    this.manutencaoForm = this.fb.group({
      modelo: ['', Validators.required],
      placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      kmAtual: ['', [Validators.required, Validators.min(0), Validators.max(9999999)]],
      kmTrocaOleo: ['', [Validators.required, Validators.min(0), Validators.max(9999999)]]
    });
  }
  onSubmit() {
    if (this.manutencaoForm.valid) {
      console.log('Dados da manutenção:', this.manutencaoForm.value);
      alert('Manutenção cadastrado com sucesso!');
    } else {
      alert('Preencha todos os campos corretamente.');
    }
  }

  formularioAlterarManutencao(){
  // Formulário de alteração (Inclui um ID)
    this.alteracaoForm = this.fb.group({
      id: [null], // ID da manutenção a ser alterada
      modelo: ['', Validators.required],
      placa: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      kmAtual: [null, [Validators.required, Validators.min(0), Validators.max(9999999)]],
      kmTrocaOleo: [null, [Validators.required, Validators.min(1), Validators.max(9999999)]]
    });
  }

  onUpdate(): void {
    if (this.alteracaoForm.valid) {
      console.log('Manutenção alterada:', this.alteracaoForm.value);
      // Aqui você pode chamar o serviço para atualizar no backend
    }
  }

  onDelete(): void {
    const id = this.alteracaoForm.get('id')?.value;
    if (id) {
      console.log('Manutenção excluída com ID:', id);
      // Aqui você pode chamar o serviço para excluir no backend
    }
  }
}
