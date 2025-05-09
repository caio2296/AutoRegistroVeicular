import{Injectable, OnInit} from"@angular/core";

@Injectable(
    {providedIn:'root'}
)
export class AutenticaService implements OnInit{
 private autenticado!: boolean;

constructor() {
 if (typeof window !== "undefined") {
    const tokenString = sessionStorage.getItem('token');
    if (tokenString) {
      this.autenticado = true;
    }
}
    

}
    ngOnInit(): void {
    
    }

 public DefineToken(token: string){
   const tokenString = JSON.stringify(token);
   sessionStorage.setItem('token', tokenString); 
   this.autenticado = true;
   //sessionStorage.setItem('token',token);
 }
 public ObterToken(){
  if (typeof window !== 'undefined' && window.sessionStorage) {
    const tokenString = sessionStorage.getItem('token');
    return tokenString ? JSON.parse(tokenString) : null;
  }
  return null;
 }
 public LimparToken(){
    sessionStorage.removeItem('token');
    this.autenticado=false;
 }

 public estaAutenticado(): boolean {
  return this.autenticado;
}

}