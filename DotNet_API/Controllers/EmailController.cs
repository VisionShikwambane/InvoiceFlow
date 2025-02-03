using DotNet_API.DtoModels;
using DotNet_API.Services;
using DotNet_API.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotNet_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailService;

        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send-invoice")]
        public async Task<ActionResult<ResponseObject<IEnumerable<bool>>>> SendInvoiceEmail([FromBody] int invoiceId)
        {
            try
            {
                var results = await _emailService.SendInvoiceEmailAsync(invoiceId);
                return Ok(results);


            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Failed to send invoice email.", Error = ex.Message });
            }
        }

    }


    public class EmailRequest
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
