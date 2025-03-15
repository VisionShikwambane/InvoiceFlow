using AutoMapper;
using DotNet_API.DataModels;
using DotNet_API.DtoModels;

namespace DotNet_API.Utilities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Invoice, InvoiceDto>()
                .ForMember(dest => dest.ItemsDto, opt => opt.MapFrom(src => src.Items))
                .ForMember(dest => dest.ClientDto, opt => opt.MapFrom(src => src.Client))
                .ForMember(dest => dest.InvoiceTemplateDto, opt => opt.MapFrom(src => src.InvoiceTemplate))

                .ReverseMap()
                .ForMember(dest => dest.Client, opt => opt.Ignore())
                .ForMember(dest => dest.InvoiceTemplate, opt => opt.Ignore());

            CreateMap<ClientDto, Client>().ReverseMap();

            CreateMap<InvoiceItemDto, InvoiceItem>().ReverseMap();

            CreateMap<InvoiceTemplateDto, InvoiceTemplate>().ReverseMap();



        }
    }
}
