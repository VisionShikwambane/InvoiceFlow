using DotNet_API.DatabaseContext;
using DotNet_API.DataModels;

namespace DotNet_API.Repositories
{
    public class ClientRepository : BaseRepository<Client>
    {
        public ClientRepository(AppDbContext context) : base(context)
        {

        }
    }
}
