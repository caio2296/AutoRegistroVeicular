import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environment/environment.prod";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {
    private readonly baseUrl = environment["endPoint"];

  constructor(private http: HttpClient) {}

  getVeiculos(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/` );
  }
}
