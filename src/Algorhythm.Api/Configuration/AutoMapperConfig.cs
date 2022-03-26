using Algorhythm.Api.Dtos;
using Algorhythm.Business.Models;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;

namespace Algorhythm.Api.Configuration
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Exercise, ExerciseDto>().ForMember(s => s.Alternatives, opt => opt.MapFrom(s => s.Alternatives.Select(x => x.Title)));
            CreateMap<ExerciseDto, Exercise>().ForMember(s => s.Alternatives, opt => opt.MapFrom(s => s.Alternatives.Select(x => new Alternative { Title = x}).ToList()));
            CreateMap<Alternative, AlternativeDto>().ReverseMap();
            CreateMap<User, RegisterUserDto>().ReverseMap();
        }
    }
}
