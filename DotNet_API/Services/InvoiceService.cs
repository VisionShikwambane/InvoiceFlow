using AutoMapper;
using DinkToPdf;
using DinkToPdf.Contracts;
using DotNet_API.DatabaseContext;
using DotNet_API.DataModels;
using DotNet_API.DtoModels;
using DotNet_API.Repositories;
using DotNet_API.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNet_API.Services
{
    public class InvoiceService
    {

        private readonly InvoiceRepository invoiceRepository;
        private readonly ClientRepository clientRepository;
        private readonly InvoiceItemRepository invoiceitemRepository;
        private readonly IMapper mapper;
        private readonly ViewRenderService viewRenderService;
        private readonly IConverter converter;
        private readonly AppDbContext appDbContext;
        public InvoiceService(InvoiceRepository invoiceRepository, IMapper mapper, ClientRepository clientRepository, InvoiceItemRepository invoiceitemRepository, ViewRenderService viewRenderService, IConverter converter, AppDbContext appDbContext)
        {

            this.invoiceRepository = invoiceRepository;
            this.mapper = mapper;
            this.clientRepository = clientRepository;
            this.invoiceitemRepository = invoiceitemRepository;
            this.viewRenderService = viewRenderService;
            this.converter = converter;
            this.appDbContext = appDbContext;
        }


        public async Task<List<InvoiceDto>> GetInvoicesWithDetailsAsync(int userId)
        {
            // Fetch from the repository
            var invoices = await this.invoiceRepository.GetInvoicesWithDetailsAsync(userId);

            // Map to DTOs using AutoMapper
            var invoiceDtos = this.mapper.Map<List<InvoiceDto>>(invoices);


            return invoiceDtos;
        }

        public async Task<FileResult> GenerateInvoicePdf(int invoiceId)
        {
            var invoice = await this.invoiceRepository.GetInvoiceById(invoiceId);
           

            if (invoice == null)
            {
                throw new KeyNotFoundException($"Invoice with ID {invoiceId} not found");
            }

            try
            {
                var invoiceDto = this.mapper.Map<InvoiceDto>(invoice);


                var html = await this.viewRenderService.RenderToStringAsync($"{invoiceDto.InvoiceTemplate!.TemplatePath}", invoiceDto);

                var doc = new HtmlToPdfDocument()
                {
                    GlobalSettings = {
                    ColorMode = ColorMode.Color,
                    PaperSize = PaperKind.A4,
                    Margins = new MarginSettings {
                    Top = 10,
                    Bottom = 10,
                    Left = 10,
                    Right = 10
                }}, Objects = { new ObjectSettings {HtmlContent = html, WebSettings = { DefaultEncoding = "utf-8", LoadImages = true, EnableIntelligentShrinking = true }}}
                };

                byte[] pdf = this.converter.Convert(doc);
                return new FileContentResult(pdf, "application/pdf")
                {
                    FileDownloadName = $"invoice-{invoice.InvoiceNo}.pdf"
                };
            }
            catch (Exception ex)
            {

                throw new ApplicationException($"Error generating PDF for invoice {invoiceId}: {ex.Message}", ex);
            }
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
                if (invoiceEntity.Id > 0)
                {
                    await this.invoiceitemRepository.DeleteByInvoiceIdAsync(invoiceEntity.Id);
                }
                invoiceEntity.Items = this.mapper.Map<List<InvoiceItem>>(invoiceDto.Items);
                foreach (var item in invoiceEntity.Items)
                {
                    item.InvoiceId = invoiceEntity.Id;
                }
            }

            await this.invoiceRepository.AddAsync(invoiceEntity);
            var savedInvoiceDto = this.mapper.Map<InvoiceDto>(invoiceEntity);

            return new ResponseObject<InvoiceDto>(true, "Invoice, Client, and InvoiceItems added successfully", savedInvoiceDto);
        }


        public async Task<ResponseObject<InvoiceDto>> ArchiveInvoice(InvoiceDto invoiceDto)
        {
            var invoice = await this.invoiceRepository.GetInvoiceById(invoiceDto.Id);
            if (invoice == null)
            {
                return new ResponseObject<InvoiceDto>(false, "Invoice not found", null);
            }

            invoice.isArchived = invoiceDto.isArchived;
            this.appDbContext.Invoices.Attach(invoice);
            this.appDbContext.Entry(invoice).State = EntityState.Modified;
            await this.appDbContext.SaveChangesAsync();

            var updatedInvoiceDto = this.mapper.Map<InvoiceDto>(invoice);

            // Make sure we return the updated invoice in the Data property
            return new ResponseObject<InvoiceDto>(
                true,
                invoiceDto.isArchived ? "Invoice archived successfully" : "Invoice unarchived successfully",
                null
            );

         
        }


        public async Task<ResponseObject<InvoiceDto>> UpdateStatus(InvoiceDto invoiceDto)
        {
            try
            {
                var invoice = await this.invoiceRepository.GetInvoiceById(invoiceDto.Id);

                if (invoice == null)
                {
                    return new ResponseObject<InvoiceDto>(false, "Invoice not found", null!);
                }
                invoice.Status = invoiceDto.Status;
                this.appDbContext.Invoices.Attach(invoice);
                this.appDbContext.Entry(invoice).State = EntityState.Modified;
                await this.appDbContext.SaveChangesAsync();
                var savedInvoiceDto = this.mapper.Map<InvoiceDto>(invoice);

                return new ResponseObject<InvoiceDto>(true, "Invoice archived successfully", null);

            }
            catch (Exception ex)
            {

                throw;
            }
          
        }



    }
}
