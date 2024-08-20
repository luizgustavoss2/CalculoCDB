// investment.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InvestmentService } from './investment.service';

describe('InvestmentService', () => {
  let service: InvestmentService;
  let httpTestingController: HttpTestingController;

  const apiUrl = 'https://localhost:5001/v1/CalculoCdb';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InvestmentService]
    });

    service = TestBed.inject(InvestmentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected investment result (HttpClient called once)', () => {
    const mockResult = {
      ValorBruto: 13476.99,
      ValorLiquido: 11563.99
    };

    service.calcularInvestimento(10000, 12).subscribe(result => {
      expect(result).toEqual(mockResult);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResult);
  });
});
