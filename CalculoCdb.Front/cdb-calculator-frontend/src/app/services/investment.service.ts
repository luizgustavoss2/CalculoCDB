import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  private apiUrl = 'https://localhost:5001/v1/CalculoCdb';

  constructor(private http: HttpClient) { }

  calcularInvestimento(valorInicial?: number, prazoEmMeses?: number): Observable<any> {

    const valor = valorInicial != null ? valorInicial : 0;
    const prazo = prazoEmMeses != null ? prazoEmMeses : 0;

    const requestData = {
      valorInicial: valor,
      prazoEmMeses: prazo
    };

    return this.http.post<any>(this.apiUrl, requestData);
  }
}
