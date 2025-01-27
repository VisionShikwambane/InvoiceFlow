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
    public class InvoiceTemplateController : ControllerBase
    {

        private readonly InvoiceTemplateRepository invoiceTemplateRepository;
       


        public InvoiceTemplateController(InvoiceTemplateRepository invoiceTemplateRepository)
        {
            this.invoiceTemplateRepository = invoiceTemplateRepository;
        }

        [HttpGet]
        public async Task<ActionResult<ResponseObject<IEnumerable<InvoiceTemplate>>>> GetAll()
        {

            var templates = await this.invoiceTemplateRepository.GetAllAsync();
            var response = new ResponseObject<IEnumerable<InvoiceTemplate>>(true, "Invoices Templates retrieved successfully", templates);
            return Ok(response);
        }



        [HttpPost]
        public async Task<ActionResult<ResponseObject<InvoiceTemplate>>> Create(
            [FromBody] InvoiceTemplate dto)
        {
            var template = new InvoiceTemplate
            {
                Name = dto.Name,
                Description = dto.Description,
                Preview = dto.Preview,
                TemplatePath = dto.TemplatePath, // Fix typo here
                Tags = dto.Tags
            };

            // Ensure AddAsync returns Task<InvoiceTemplate>
            var createdTemplate = await this.invoiceTemplateRepository.AddAsync(template);
            return  new ResponseObject<InvoiceTemplate>(true, "Invoice Template created successfully", createdTemplate);
        }

    }
}
