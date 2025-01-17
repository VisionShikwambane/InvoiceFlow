using AutoMapper;
using DotNet_API.DataModels;
using DotNet_API.DtoModels;

namespace DotNet_API.Utilities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<InvoiceDto, Invoice>().ReverseMap();

            CreateMap<ClientDto, Client>().ReverseMap();

            CreateMap<InvoiceItemDto, InvoiceItem>().ReverseMap();

        }
    }
}
