using System;
using System.Collections.Generic;
using System.Text;

namespace CalculoCdb.Domain.Service
{
    public interface ICalculoCdbService
    {
       Entities.CalculoCdb CalcularCDB(decimal valorInicial, int prazoMeses);
    }
}
