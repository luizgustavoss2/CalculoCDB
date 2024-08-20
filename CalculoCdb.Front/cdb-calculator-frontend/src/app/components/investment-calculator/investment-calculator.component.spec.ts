// investment-calculator.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InvestmentCalculatorComponent } from './investment-calculator.component';
import { InvestmentService } from '../../services/investment.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('InvestmentCalculatorComponent', () => {
  let component: InvestmentCalculatorComponent;
  let fixture: ComponentFixture<InvestmentCalculatorComponent>;
  let investmentService: InvestmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, InvestmentCalculatorComponent],
      providers: [InvestmentService]
    })
    .compileComponents();

    investmentService = TestBed.inject(InvestmentService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call calcularInvestimento and display results', () => {
    const mockResult = {
      ValorBruto: 11230.82,
      ValorLiquido: 10984.66
    };

    spyOn(investmentService, 'calcularInvestimento').and.returnValue(of(mockResult));

    component.valorInicial = 10000;
    component.prazoEmMeses = 12;

    component.calcularInvestimento();

    fixture.detectChanges(); // Atualiza o DOM

    const compiled = fixture.nativeElement as HTMLElement;

    console.log("********************************************** mockResult **************************************************************");
    console.log(mockResult);
    console.log("********************************************************************************************************************");

    // Ajuste o formato para corresponder ao valor real exibido
    console.log("********************************************** Result **************************************************************");
    console.log(compiled.querySelector('p')?.textContent);
    console.log(compiled);
    console.log("************************************************************************************************************");

    expect(compiled.querySelector('p')?.textContent).toContain('Valor Bruto: 11,230.82');
    expect(compiled.querySelector('p')?.textContent).toContain('Valor Líquido: 10,984.66');
  });
});
