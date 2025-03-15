using AutoMapper;
using DotNet_API.DatabaseContext;
using DotNet_API.DataModels;
using Microsoft.EntityFrameworkCore;

namespace DotNet_API.Repositories
{
    public class InvoiceItemRepository : BaseRepository<InvoiceItem, InvoiceItem>
    {
        public InvoiceItemRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override async Task UpdateAsync(InvoiceItem entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public async Task DeleteByInvoiceIdAsync(int invoiceId)
        {
            var items = await dbContext.Set<InvoiceItem>()
                .Where(item => item.InvoiceId == invoiceId)
                .ToListAsync();

            if (items.Any())
            {
                dbContext.Set<InvoiceItem>().RemoveRange(items);
                await dbContext.SaveChangesAsync();
            }
        }
    }
}
