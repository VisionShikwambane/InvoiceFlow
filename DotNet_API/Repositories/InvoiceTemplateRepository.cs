using DotNet_API.DatabaseContext;
using DotNet_API.DataModels;

namespace DotNet_API.Repositories
{
    public class InvoiceTemplateRepository : BaseRepository<InvoiceTemplate>
    {
        public InvoiceTemplateRepository(AppDbContext context) : base(context)
        {

        }
    
    }
}
