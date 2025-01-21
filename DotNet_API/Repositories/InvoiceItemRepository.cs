using DotNet_API.DatabaseContext;
using DotNet_API.DataModels;
using Microsoft.EntityFrameworkCore;

namespace DotNet_API.Repositories
{
    public class InvoiceItemRepository : BaseRepository<InvoiceItem>
    {
        public InvoiceItemRepository(AppDbContext context) : base(context)
        {
        }

        public override async Task UpdateAsync(InvoiceItem entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
