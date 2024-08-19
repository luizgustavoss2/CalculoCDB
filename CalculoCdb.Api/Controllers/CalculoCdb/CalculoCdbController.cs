using CalculoCdb.Domain.Service;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CalculoCdb.Api.Controllers.CalculoCdb
{
    [Route("v{ver:apiVersion}/[controller]")]
    [ApiController]
    public class CalculoCdbController : Controller
    {
        private readonly ICalculoCdbService _calculoCdbService;
        public CalculoCdbController(ICalculoCdbService calculoCdbService)
        {
            _calculoCdbService = calculoCdbService;
        }

        [HttpPost()]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [Produces("application/json")]
        [ApiVersion("1.0")]
        public CalculoCdbResult CalculoCdb([FromBody] CalculoCdbRequest request)
        {
            var result = _calculoCdbService.CalcularCDB(request.ValorInicial, request.PrazoEmMeses);

            return new CalculoCdbResult()
            {
                ValorBruto = result.ValorBruto,
                ValorLiquido = result.ValorLiquido
            };
        }
    }
}
