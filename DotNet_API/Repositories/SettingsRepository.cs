using AutoMapper;
using DotNet_API.DatabaseContext;
using DotNet_API.DataModels;
using DotNet_API.DtoModels;

namespace DotNet_API.Repositories
{
    public class SettingsRepository : BaseRepository<Settings, SettingsDto>
    {
        public SettingsRepository(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {

        }
    }
}
