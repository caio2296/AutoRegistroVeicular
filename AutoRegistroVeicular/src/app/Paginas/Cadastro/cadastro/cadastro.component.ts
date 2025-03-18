import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  // Importar corretamente o HttpClient
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule,HttpClientModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  usuarioForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
  
  }
  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nomeEmpresa: ['', Validators.required],
      celular: ['', [ Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?\d{5}-?\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.senhasCoincidem });
  }

  // Validação personalizada para senha e confirmação de senha
  senhasCoincidem(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { senhasNaoCoincidem: true };
  }

  // Função para lidar com a seleção do arquivo de foto
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.usuarioForm.patchValue({ foto: file });
      this.usuarioForm.get('foto')?.updateValueAndValidity();
    }

  }

  formatarCampoCelular(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    
    if (inputElement) {
      const valorFormatado = this.formatarCelular(inputElement.value);
      this.usuarioForm.controls['celular'].setValue(valorFormatado, { emitEvent: false });
    }
  }
  

  formatarCelular(valor: string): string {
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, '');
  
    // Aplica a máscara (XX) XXXXX-XXXX
    if (valor.length > 10) {
      valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (valor.length > 5) { // Aplica a máscara corretamente após 5 dígitos
      valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
    } else if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (valor.length > 0) {
      valor = valor.replace(/^(\d{0,2})$/, '($1');
    }
  
    return valor;
  }
  

  onSubmit() {
    if (this.usuarioForm.valid && this.selectedFile) {
      const formData = new FormData();
      
      // Adicionar dados do formulário
      formData.append('nomeEmpresa', this.usuarioForm.get('nomeEmpresa')?.value);
      formData.append('celular', this.usuarioForm.get('celular')?.value);
      formData.append('email', this.usuarioForm.get('email')?.value);
      formData.append('senha', this.usuarioForm.get('senha')?.value);
      formData.append('confirmarSenha', this.usuarioForm.get('confirmarSenha')?.value);

      // Adicionar o arquivo de foto
      formData.append('foto', this.selectedFile, this.selectedFile.name);

      // Enviar para o backend
      this.http.post('API_URL_AQUI', formData).subscribe(
        (response) => {
          
          console.log('Usuário criado com sucesso!', response);
        },
        (error) => {
          formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
          });
          const foto = formData.get('foto'); // 'foto' é o nome do campo no FormData
    if (foto) {
      console.log('Arquivo da foto:', foto);
      // Se você precisar do nome do arquivo, use `foto.name`
      console.log('Nome do arquivo da foto:', (foto as File).name);
      // Se precisar acessar o tamanho do arquivo, use `foto.size`
      console.log('Tamanho do arquivo da foto:', (foto as File).size);
    }else {
      console.log('Nenhuma foto foi enviada');
    }
          console.error('Erro ao criar usuário', error);
        }
      );
    } else {
      console.log('Formulário inválido');
      console.log(this.usuarioForm);
      console.log(this.selectedFile)
    }
  }
}
