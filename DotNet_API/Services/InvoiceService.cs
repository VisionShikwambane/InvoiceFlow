using AutoMapper;
using DotNet_API.DataModels;
using DotNet_API.DtoModels;
using DotNet_API.Repositories;
using DotNet_API.Utilities;

namespace DotNet_API.Services
{
    public class InvoiceService
    {

        private readonly InvoiceRepository invoiceRepository;
        private readonly ClientRepository clientRepository;
        private readonly InvoiceItemRepository invoiceitemRepository;
        private readonly IMapper mapper;
        public InvoiceService(InvoiceRepository invoiceRepository, IMapper mapper, ClientRepository clientRepository, InvoiceItemRepository invoiceitemRepository)
        {

            this.invoiceRepository = invoiceRepository;
            this.mapper = mapper;
            this.clientRepository = clientRepository;
            this.invoiceitemRepository = invoiceitemRepository;
        }


        public async Task<List<InvoiceDto>> GetInvoicesWithDetailsAsync(int userId)
        {
            // Fetch from the repository
            var invoices = await this.invoiceRepository.GetInvoicesWithDetailsAsync(userId);

            // Map to DTOs using AutoMapper
            var invoiceDtos = this.mapper.Map<List<InvoiceDto>>(invoices);

            return invoiceDtos;
        }




        public async Task<ResponseObject<InvoiceDto>> AddInvoiceAsync(InvoiceDto invoiceDto)
        {
            if (invoiceDto == null)
            {
                throw new ArgumentNullException(nameof(invoiceDto), "Invoice cannot be null");
            }

            if (!DtoValidator.Validate(invoiceDto, out var validationErrors))
            {
                return new ResponseObject<InvoiceDto>(false, "Validation failed", null)
                {
                    Errors = validationErrors
                };
            }

            var invoiceEntity = this.mapper.Map<Invoice>(invoiceDto);

            if (invoiceDto.Client != null)
            {
                var existingClient = await this.clientRepository.GetByConditionAsync(c => c.Email == invoiceDto.Client.Email);

                if (existingClient == null)
                {
                    var clientEntity = this.mapper.Map<Client>(invoiceDto.Client);
                    await this.clientRepository.AddAsync(clientEntity);
                    invoiceEntity.ClientId = clientEntity.Id;
                }
                else
                {
                    invoiceEntity.ClientId = existingClient.Id;
                }
            }

            if (invoiceDto.Items != null && invoiceDto.Items.Any())
            {
                invoiceEntity.Items = this.mapper.Map<List<InvoiceItem>>(invoiceDto.Items);

                // Ensure all items are linked to the Invoice
                foreach (var item in invoiceEntity.Items)
                {
                    item.InvoiceId = invoiceEntity.Id;
                }
            }

            await this.invoiceRepository.AddAsync(invoiceEntity);
            var savedInvoiceDto = this.mapper.Map<InvoiceDto>(invoiceEntity);

            return new ResponseObject<InvoiceDto>(true, "Invoice, Client, and InvoiceItems added successfully", savedInvoiceDto);
        }


    }
}
