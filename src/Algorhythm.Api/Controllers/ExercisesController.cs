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

        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<ExerciseDto>> GetAll()
        {
            var exercises = _mapper.Map<IEnumerable<ExerciseDto>>(await _exerciseRepository.GetAll());

            return exercises;
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ExerciseDto>> GetbyId([FromQuery] Guid id)
        {
            var exercise = _mapper.Map<ExerciseDto>(await _exerciseRepository.GetById(id));

            if (exercise is null) 
                return NotFound();

            return exercise;
        }

        [HttpPost]
        public async Task<ActionResult<ExerciseDto>> Add(ExerciseDto exerciseDto)
        {
            if (!ModelState.IsValid) 
                return CustomResponse(ModelState);

            var exercise = new Exercise 
            {
                ModuleId = exerciseDto.ModuleId,
                CorrectAnswer = exerciseDto.correctAlternative,
                Alternatives = exerciseDto.Alternatives.Select(s => new Alternative { Title = s}).ToList(),
                Question = exerciseDto.Question,
            };
            await _exerciseService.Add(exercise);

            return CustomResponse(exerciseDto);
        }

        [HttpPut]
        public async Task<ActionResult<ExerciseDto>> Update(Guid id, ExerciseDto exerciseDto)
        {
            if (id != exerciseDto.Id)
            {
                NotifyError("O id informado não é o mesmo passado na query");
                return CustomResponse(exerciseDto);
            }

            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            var exercise = _mapper.Map<Exercise>(exerciseDto);
            await _exerciseService.Update(exercise);

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
