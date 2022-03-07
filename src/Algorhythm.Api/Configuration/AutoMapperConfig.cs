using Algorhythm.Api.Dtos;
using Algorhythm.Business.Models;
using AutoMapper;

namespace Algorhythm.Api.Configuration
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Exercise, ExerciseDto>().ReverseMap();
            CreateMap<Alternative, AlternativeDto>().ReverseMap();
            CreateMap<User, RegisterUserDto>().ReverseMap();
        }
    }
}
