import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  manutencoes!: Array<manutencaoViewModel>;
  veiculo!: VeiculoViewModel;
  manutencao!:manutencaoViewModel;
  veiculoForm!: FormGroup;
  manutencaoForm!: FormGroup;
  private id!: string;

  mostrarFormularioVeiculo: boolean = false;
  mostrarFormularioManutencao: boolean = false;

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    private manutencaoService: ManutencaoService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      this.carregarVeiculo();
      this.carregarManutencoes(this.id);
    });
  }

  carregarManutencoes(idVeiculo: string) {
    this.manutencaoService.BuscarManutencoesCustomizadas(idVeiculo).subscribe(manutencoes => {
      this.manutencoes = manutencoes;
      console.log("Manutenções localizadas", manutencoes);
    });
  }

  carregarVeiculo() {
    this.veiculoService.getVeiculo(this.id).subscribe(veiculo => {
      this.veiculo = veiculo;
      this.formularioVeiculo(veiculo);
      this.formularioManutencao(); // inicializa o form de manutenção
    });
  }

  abrirDetalhesManutencao(id: string) {
    console.log("Redirecionando para Manutenção:", id);
    this.router.navigate([`/Manutencao`, id]); // Formato correto para parâmetros dinâmicos
  }

  formularioVeiculo(veiculo: any) {
    this.veiculoForm = this.fb.group({
      id: [veiculo.id],
      placa: [veiculo.placa, [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      kmAtual: [veiculo.kmAtual, [Validators.required, Validators.min(0), Validators.max(9999999)]],
      kmTrocaOleo: [veiculo.kmTrocaOleo, [Validators.required, Validators.min(1), Validators.max(9999999)]]
    });
  }

  formularioManutencao() {
    this.manutencaoForm = this.fb.group({
      nomePeca: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0)]],
      dataDaCompra: [null], // opcional
      dataDaInstalacao: [null], // opcional
      fabricante: [''],
      idVeiculo: [this.id]
    });
  }

  onSubmit(): void {
    if (this.veiculoForm.valid) {
      this.veiculoService.AtualizarVeiculo(this.veiculoForm.value).subscribe({
        next: () => {
          alert('Veículo Atualizado com sucesso!');
        },
        error: (error) => {
          console.error("Falha ao atualizar!", error);
          if (error.status === 400 && error.error) {
            alert(`Erro: ${error.error}`);
          } else if (error.status === 500) {
            alert("Erro interno no servidor. Tente novamente mais tarde.");
          } else {
            alert("Erro desconhecido ao atualizar o veículo.");
          }
        }
      });
    } else {
      console.log('Formulário de veículo inválido!');
    }
  }

  cadastrarManutencao(): void {
    if (this.manutencaoForm.valid) {
      const novaManutencao = this.manutencaoForm.value;
      this.manutencaoService.AdicionarManutencao(novaManutencao).subscribe({
        next: () => {
          alert('Manutenção cadastrada com sucesso!');
          this.carregarManutencoes(this.id); // recarrega a lista
          this.manutencaoForm.reset(); // limpa o form
        },
        error: (error) => {
          console.error('Erro ao cadastrar manutenção:', error);
          alert('Erro ao cadastrar manutenção.');
        }
      });
    } else {
      alert('Preencha todos os campos obrigatórios da manutenção.');
    }
  }
}
