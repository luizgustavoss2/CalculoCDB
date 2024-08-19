using System;
using System.Collections.Generic;
using System.Text;

namespace CalculoCdb.Application.Service
{
    public class CalculoCdbService : Domain.Service.ICalculoCdbService
    {
        private const decimal TaxaCDI = 0.009m; // CDI de 0,9%
        private const decimal TaxaBanco = 1.08m; // TB de 108%
        public Domain.Entities.CalculoCdb CalcularCDB(decimal valorInicial, int prazoMeses)
        {
            decimal valorBruto = valorInicial;

            for (int i = 0; i < prazoMeses; i++)
            {
                valorBruto *= (1 + (TaxaCDI * TaxaBanco));
            }

            decimal taxaImposto = ObterTaxaImposto(prazoMeses);
            decimal imposto = (valorBruto - valorInicial) * taxaImposto;
            decimal valorLiquido = valorBruto - imposto;

            return new Domain.Entities.CalculoCdb()
            {
                ValorBruto = valorBruto,
                ValorLiquido = valorLiquido
            };
        }

        private decimal ObterTaxaImposto(int prazoEmMeses)
        {
            if (prazoEmMeses <= 6)
                return 0.225m;
            if (prazoEmMeses <= 12)
                return 0.20m;
            if (prazoEmMeses <= 24)
                return 0.175m;
            return 0.15m;
        }
    }
}
