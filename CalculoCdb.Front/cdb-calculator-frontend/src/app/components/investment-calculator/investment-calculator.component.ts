import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-investment-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './investment-calculator.component.html',
  styleUrls: ['./investment-calculator.component.css']
})
export class InvestmentCalculatorComponent {
  valorInicial?: number;
  prazoEmMeses?: number;
  resultado: { ValorBruto: number; ValorLiquido: number } | null = null;

  constructor(private investmentService: InvestmentService) {}

  calcularInvestimento() {
    this.investmentService.calcularInvestimento(this.valorInicial, this.prazoEmMeses)
      .subscribe({
        next: (response) => {
          this.resultado = {
            ValorBruto: response.valorBruto,
            ValorLiquido: response.valorLiquido
          };
          console.log("***************************************** Response *****************************************")
          console.log(response)
          console.log(this.resultado)
          console.log("********************************************************************************************")
        },
        error: (error) => {
          console.error('Erro ao calcular investimento:', error);
        }
      });
  }
}
