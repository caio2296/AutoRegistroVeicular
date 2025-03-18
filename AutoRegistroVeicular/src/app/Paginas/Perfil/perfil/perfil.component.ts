import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VeiculoService } from '../../../Services/Veiculo.Service';
import { CommonModule } from '@angular/common';
import { VeiculoViewModel } from '../../../Models/VeiculoViewModel';
import { UsuarioService } from '../../../Services/Usuario.Service';
import { UsuarioViewModel } from '../../../Models/UsuarioViewModel';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  empresaNome: string = 'Nome da Empresa';
  veiculos!:Array<VeiculoViewModel>;
  usuario!:UsuarioViewModel;

  constructor(private veiculoService: VeiculoService, private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.carregarUsuario();
    this.carregarVeiculos();
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

  abrirDetalhesVeiculo(id: number) {
    this.router.navigate(['/veiculo', id]); // Redireciona para a página de detalhes
  }
}
