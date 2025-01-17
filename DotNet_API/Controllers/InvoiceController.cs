using DotNet_API.DataModels;
using DotNet_API.DtoModels;
using DotNet_API.Repositories;
using DotNet_API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotNet_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {

        private readonly InvoiceRepository invoiceRepository;
        private readonly InvoiceService invoiceService;


        public InvoiceController(InvoiceRepository invoiceRepository, InvoiceService invoiceService)
        {
            this.invoiceService = invoiceService;
            this.invoiceRepository = invoiceRepository;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<InvoiceDto>>> GetAll()
        {
            var invoices = await this.invoiceService.GetInvoicesWithDetailsAsync(0);
            return Ok(invoices);
        }


        // POST: api/Invoice
        [HttpPost]
        public async Task<IActionResult> AddInvoice([FromBody] InvoiceDto invoiceDto)
        {
            if (invoiceDto == null)
            {
                return BadRequest(new { Message = "Invoice data cannot be null." });
            }

            try
            {
                var response = await this.invoiceService.AddInvoiceAsync(invoiceDto);

                if (response.Success)
                {
                    return Ok(response); // Return 200 OK with response object
                }
                else
                {
                    return BadRequest(new { Message = response.Message });
                }
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An unexpected error occurred.", Details = ex.Message });
            }
        }

    }
}
