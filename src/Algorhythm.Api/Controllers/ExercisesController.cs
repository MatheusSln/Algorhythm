using Algorhythm.Api.Dtos;
using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Algorhythm.Api.Controllers
{
    [Route("api/exercises")]
    public class ExercisesController : MainController
    {
        private readonly IExerciseRepository _exerciseRepository;
        private readonly IExerciseService _exerciseService;
        private readonly IMapper _mapper;

        public ExercisesController(IExerciseRepository exerciseRepository,
                                   IMapper mapper,
                                   IExerciseService exerciseService,
                                   INotifier notifier) :
            base(notifier)
        {
            _exerciseRepository = exerciseRepository;
            _mapper = mapper;
            _exerciseService = exerciseService;
        }

        [HttpGet]
        public async Task<IEnumerable<ExerciseDto>> GetAll()
        {
            return _mapper.Map<IEnumerable<ExerciseDto>>(await _exerciseRepository.GetAllExercisesAndAlternatives());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ExerciseDto>> GetbyId([FromRoute] Guid id)
        {
            var exercise = _mapper.Map<ExerciseDto>(await _exerciseRepository.GetExerciseAndAlternatives(id));

            if (exercise is null) 
                return NotFound();

            return exercise;
        }

        [HttpPost]
        public async Task<ActionResult<ExerciseDto>> Add(ExerciseDto exerciseDto)
        {
            if (!ModelState.IsValid) 
                return CustomResponse(ModelState);

            exerciseDto.Id = null;

            var exercise = _mapper.Map<Exercise>(exerciseDto);
            await _exerciseService.Add(exercise);

            return CustomResponse(exerciseDto);
        }

        [HttpPut]
        public async Task<ActionResult<ExerciseDto>> Update(ExerciseDto exerciseDto)
        {

            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            var exercise = _mapper.Map<Exercise>(exerciseDto);

            return CustomResponse(exerciseDto);
        }

        [HttpDelete("id:guid")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var exercise = await _exerciseRepository.GetById(id);

            if (exercise is null)
                return NotFound();

            await _exerciseService.Remove(id);

            return CustomResponse();
        }
    }
}
