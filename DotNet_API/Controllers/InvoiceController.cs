using DotNet_API.DataModels;
using DotNet_API.DtoModels;
using DotNet_API.Repositories;
using DotNet_API.Services;
using DotNet_API.Utilities;
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





        [HttpDelete("{id}")]
        public async Task<ActionResult<ResponseObject<bool>>> DeleteInvoice(int id)
        {
            try
            {
                var invoice = await this.invoiceRepository.GetByIdAsync(id);
                if (invoice == null)
                {
                    return NotFound(new ResponseObject<bool>(false, "Invoice not found", false));
                }

                await this.invoiceRepository.DeleteAsync(id);
                return Ok(new ResponseObject<bool>(true, "Invoice deleted successfully", true));
            }
            catch (Exception ex)
            {
                var errorMessage = $"An unexpected error occurred while deleting invoice: {ex.Message}";
                return StatusCode(500, new ResponseObject<bool>(false, errorMessage, false));
            }
        }


        [HttpGet("GeneratePdf/{invoiceId}")]
        public async Task<IActionResult> GenerateInvoicePdf(int invoiceId)
        {
            try
            {
                var fileResult = await this.invoiceService.GenerateInvoicePdf(invoiceId);
                return fileResult;
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new ResponseObject<bool>(false, ex.Message, false));
            }
            catch (Exception ex)
            {
                var errorMessage = $"An error occurred while generating PDF: {ex.Message}";
                return StatusCode(500, new ResponseObject<bool>(false, errorMessage, false));
            }
        }

        [HttpPost("archive")]
        public async Task<IActionResult> ArchiveInvoice([FromBody] InvoiceDto invoiceDto)
        {
            try
            {
                var response = await this.invoiceService.ArchiveInvoice(invoiceDto);
                return Ok(response);
            }
            catch (Exception ex)
            {

                var errorMessage = $"An unexpected error occurred: {ex.Message}";
                return StatusCode(500, new ResponseObject<InvoiceDto>(false, errorMessage, null));
            }
          
        }


        [HttpPost("updateStatus")]
        public async Task<IActionResult> UpdateStatus([FromBody] InvoiceDto invoiceDto)
        {
            try
            {
                var response = await this.invoiceService.UpdateStatus(invoiceDto);
                return Ok(response);
            }
            catch (Exception ex)
            {

                var errorMessage = $"An unexpected error occurred: {ex.Message}";
                return StatusCode(500, new ResponseObject<InvoiceDto>(false, errorMessage, null!));
            }

        }






    }
}
