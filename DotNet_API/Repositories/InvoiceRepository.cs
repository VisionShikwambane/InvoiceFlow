using AutoMapper;
using DotNet_API.DatabaseContext;
using DotNet_API.DataModels;
using DotNet_API.DtoModels;
using DotNet_API.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DotNet_API.Repositories
{
    public class InvoiceRepository : BaseRepository<Invoice, InvoiceDto>
    {
        public InvoiceRepository(AppDbContext dbContext, IMapper mapper, UserManager<AppUser> userManager) : base(dbContext, mapper, userManager)
        {
        }


        public override async Task<IEnumerable<InvoiceDto>> GetAll()
        {
            try
            {
                var entities = await dbContext.Invoices.Where(e=>e.UserId == 2)
                    .Include(c => c.Items)
                    .Include(e=>e.Client)
                    .Include(e=>e.InvoiceTemplate)
                    .ToListAsync();

                var carDtos = mapper.Map<IEnumerable<InvoiceDto>>(entities);
                    
                return carDtos;
            }

            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                throw new Exception("An unexpected error occurred.", ex);
            }
        }

        public async override Task<ResponseObject<InvoiceDto>> Add(InvoiceDto dto)
        {
            try
            {
                var entity = mapper.Map<Invoice>(dto);
                var validationResult = IsValidated(entity, dto);

                if (!validationResult.IsValid)
                {
                    return new ResponseObject<InvoiceDto>(false, validationResult.Message, dto);
                }


                dbContext.Set<Invoice>().Update(entity);
                await dbContext.SaveChangesAsync();
                dbContext.Entry(entity).State = EntityState.Detached;
                var updatedDto = mapper.Map<InvoiceDto>(entity);
                return new ResponseObject<InvoiceDto>(true, "Record saved successfully", updatedDto);

            }
            catch (Exception ex)
            {
                return new ResponseObject<InvoiceDto>(false, $"Error adding entity: {ex.Message}");
            }
        }








        //public async Task<List<Invoice>> GetInvoicesWithDetailsAsync(int userId)
        //{
        //    return await dbContext.Invoices
        //        .Include(i => i.Client)
        //        .Include(i => i.Items.OrderBy(item => item.Id))  // Add OrderBy here
        //        .Where(i => i.UserId == userId)
        //        .ToListAsync();
        //}


        //public async Task<Invoice?> GetInvoiceById(int invoiceId) // Add '?' to Invoice
        //{
        //    return await dbContext.Invoices
        //        .Where(e => e.Id == invoiceId)
        //        .Include(i => i.Client)
        //        .Include(i => i.Items)
        //        .Include(e=>e.InvoiceTemplate)
        //        .FirstOrDefaultAsync();
        //}





    }
}
