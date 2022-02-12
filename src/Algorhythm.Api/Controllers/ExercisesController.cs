using Algorhythm.Api.Dtos;
using Algorhythm.Business.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Algorhythm.Api.Controllers
{
    [Route("api/exercises")]
    public class ExercisesController : MainController
    {
        private readonly IExerciseRepository _exerciseRepository;
        private readonly IMapper _mapper;

        public ExercisesController(IExerciseRepository exerciseRepository, IMapper mapper)
        {
            _exerciseRepository = exerciseRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ExerciseDto>> GetAll()
        {
            var exercises = _mapper.Map<IEnumerable<ExerciseDto>>(await _exerciseRepository.GetAll());

            return exercises;
        }
    }
}
