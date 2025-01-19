using DotNet_API.DataModels;
using DotNet_API.DtoModels;
using DotNet_API.Repositories;
using DotNet_API.Services;
using DotNet_API.Utilities;
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

        [HttpGet("GetUserInvoices")]
        public async Task<ActionResult<ResponseObject<IEnumerable<InvoiceDto>>>> GetAll(int userId)
        {
            // Fetch all invoices with details using the service
            var invoices = await this.invoiceService.GetInvoicesWithDetailsAsync(userId);

            // Wrap the invoices in a ResponseObject
            var response = new ResponseObject<IEnumerable<InvoiceDto>>(true, "Invoices retrieved successfully", invoices);

            // Return the response
            return Ok(response);
        }



        [HttpPost]
        public async Task<ActionResult<ResponseObject<InvoiceDto>>> AddInvoice([FromBody] InvoiceDto invoiceDto)
        {
            if (invoiceDto == null)
            {
                return BadRequest(new ResponseObject<InvoiceDto>(false, "Invoice data cannot be null", null));
            }

            try
            {
                var response = await this.invoiceService.AddInvoiceAsync(invoiceDto);

                if (response.isSuccess)
                {
                    return Ok(response); // Return 200 OK with response object
                }
                else
                {
                    return BadRequest(new ResponseObject<InvoiceDto>(false, response.Message, null));
                }
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(new ResponseObject<InvoiceDto>(false, ex.Message, null));
            }
            catch (Exception ex)
            {
                // Include exception details in the message instead
                var errorMessage = $"An unexpected error occurred: {ex.Message}";
                return StatusCode(500, new ResponseObject<InvoiceDto>(false, errorMessage, null));
            }
        }



    }
}
