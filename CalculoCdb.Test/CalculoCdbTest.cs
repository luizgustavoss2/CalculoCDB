using System;
using System.Collections.Generic;
using System.Text;
using CalculoCdb.Api.Controllers.CalculoCdb;
using CalculoCdb.Application.Service;
using CalculoCdb.Domain.Service;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
namespace CalculoCdb.Test
{
    [Trait("CalculoCdb", "Application")]
    public class CalculoCdbTest
    {
        private readonly Mock<ICalculoCdbService> _calculoCdbServiceMock = new Mock<ICalculoCdbService>();

        private readonly CalculoCdbController _controller;
        public CalculoCdbTest()
        {
            _controller = new CalculoCdbController(_calculoCdbServiceMock.Object);
        }


        [Fact]
        public void CalcularCDB_ValidRequest_ReturnsExpectedResult()
        {
            // Arrange
            var request = new CalculoCdbRequest { ValorInicial = 1000, PrazoEmMeses = 12 };
            var expectedResult = new Domain.Entities.CalculoCdb { ValorBruto = 1300.00m, ValorLiquido = 1080.00m };
            _calculoCdbServiceMock.Setup(c => c.CalcularCDB(request.ValorInicial, request.PrazoEmMeses)).Returns(expectedResult);

            // Act
            var result = _controller.CalculoCdb(request);

            // Assert
            var actionResult = Assert.IsType<CalculoCdbResult>(result);           
            Assert.Equal(expectedResult.ValorBruto, actionResult.ValorBruto);
            Assert.Equal(expectedResult.ValorLiquido, actionResult.ValorLiquido);
        }
    }
}
