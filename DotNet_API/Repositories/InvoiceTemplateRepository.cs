using AutoMapper;
using DotNet_API.DatabaseContext;
using DotNet_API.DataModels;

namespace DotNet_API.Repositories
{
    public class InvoiceTemplateRepository : BaseRepository<InvoiceTemplate, InvoiceTemplate>
    {
        public InvoiceTemplateRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
