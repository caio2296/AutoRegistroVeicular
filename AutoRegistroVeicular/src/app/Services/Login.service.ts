import { Injectable } from "@angular/core";
import { environment } from "../environment/environment.prod";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:"root"
})
export class LoginService{
    private readonly baseUrl = environment["endPoint"];

    constructor(private httpClient: HttpClient) {
        

    }

    registrarAdm(){
        return this.httpClient.get<any>(
            `profilecaio.azurewebsites.net/api/RegistroUsuarioAdm/`).subscribe({
                next:
                (s)=>{
                  console.log("sucesso!")
                },
                error: (e)=>{
                 
                  alert("Erro no envio!");
                }});
    }

    LoginUsuario(object: any){
       return this.httpClient.post<any>
        (`${this.baseUrl}CriarToken/`,object)
    }
}