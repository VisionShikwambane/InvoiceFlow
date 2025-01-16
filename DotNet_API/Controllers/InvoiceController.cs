using DotNet_API.DataModels;
using DotNet_API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotNet_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {

        private readonly InvoiceRepository invoiceRepository;

        public InvoiceController(InvoiceRepository invoiceRepository)
        {
           this.invoiceRepository = invoiceRepository;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetAll()
        {
            var invoices = await this.invoiceRepository.GetAllAsync();
            return Ok(invoices);
        }

    }
}
