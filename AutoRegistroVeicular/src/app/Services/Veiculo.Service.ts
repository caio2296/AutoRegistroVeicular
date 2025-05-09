import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environment/environment.prod";
import { Observable } from 'rxjs';
import { VeiculoViewModel } from '../Models/VeiculoViewModel';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
    private readonly baseUrl = environment["endPoint"];

  constructor(private http: HttpClient) {}

  BuscarVeiculosCustomizada(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}BuscarVeiculosCustomizada` );
  }
  AdicionarVeiculo(veiculo:VeiculoViewModel):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}AdicionarVeiculo`,veiculo);
  }
  getVeiculo(id:string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}BuscarPorId/${id}` );
}
  AtualizarVeiculo(veiculonovo: VeiculoViewModel):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}AtualizarVeiculo`, veiculonovo);
  }
}
