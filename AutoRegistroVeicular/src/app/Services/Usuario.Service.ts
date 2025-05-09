import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../environment/environment.prod";
import { Observable } from 'rxjs';
import { UsuarioViewModel } from '../Models/UsuarioViewModel';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private readonly baseUrl = environment["endPoint"];

  constructor(private http: HttpClient) {}

  obterUsuario(): Observable<any> {
    return this.http.get(`${this.baseUrl}ObterUsuario`);
  }

  RegistrarUsuario(usuario:UsuarioViewModel){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}RegistrarUsuario`, JSON.stringify(usuario), {headers})
  } 
}