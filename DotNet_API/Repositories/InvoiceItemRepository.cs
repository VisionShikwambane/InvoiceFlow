using DotNet_API.DatabaseContext;
using DotNet_API.DataModels;

namespace DotNet_API.Repositories
{
    public class InvoiceItemRepository : BaseRepository<InvoiceItem>
    {
        public InvoiceItemRepository(AppDbContext context) : base(context)
        {
        }
    }
}
