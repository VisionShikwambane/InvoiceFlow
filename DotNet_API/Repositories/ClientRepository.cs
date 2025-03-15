using AutoMapper;
using DotNet_API.DatabaseContext;
using DotNet_API.DataModels;

namespace DotNet_API.Repositories
{
    public class ClientRepository : BaseRepository<Client, Client>
    {
        public ClientRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }
    }
}
