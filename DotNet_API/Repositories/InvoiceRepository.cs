using DotNet_API.DatabaseContext;
using DotNet_API.DataModels;
using DotNet_API.DtoModels;
using Microsoft.EntityFrameworkCore;

namespace DotNet_API.Repositories
{
    public class InvoiceRepository : BaseRepository<Invoice>
    {
        public InvoiceRepository(AppDbContext context) : base(context)
        {

        }

        public async Task<List<Invoice>> GetInvoicesWithDetailsAsync(int userId)
        {
            return await _context.Invoices
                .Include(i => i.Client)
                .Include(i => i.InvoiceItems)
                .Where(i => i.UserId == userId)
                .ToListAsync();
        }





    }
}
