using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalculoCdb.Api.Controllers.CalculoCdb
{
    public class CalculoCdbRequest
    {
        public decimal ValorInicial { get; set; }
        public int PrazoEmMeses { get; set; }
    }
}
