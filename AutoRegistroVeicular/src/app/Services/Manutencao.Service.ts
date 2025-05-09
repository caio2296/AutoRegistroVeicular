import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environment/environment.prod";
import { Observable } from 'rxjs';
import { manutencaoViewModel } from '../Models/manutencaoViewModel';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {
    private readonly baseUrl = environment["endPoint"];

  constructor(private http: HttpClient) {}

  BuscarManutencoesCustomizadas(idveiculo:string): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}BuscarManutencoesCustomizadas/${idveiculo}` );
  }
  AdicionarManutencao(novaManutencao:manutencaoViewModel):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}AdicionarManutencao`,novaManutencao);
  }
  BuscarManutencaoId(idManutencao:string):Observable<any>{
   return this.http.get<manutencaoViewModel>(`${this.baseUrl}BuscarManutencaoId/${idManutencao}`);
  }
  AtualizarManutencao(manutencao: manutencaoViewModel):Observable<any>{
     return this.http.patch<any>(`${this.baseUrl}AtualizarManutencao`,manutencao);
  }
  ExcluirManutencao(id: string):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}ExcluirManutencao/${id}`);
  }
}