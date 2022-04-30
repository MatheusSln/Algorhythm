using Algorhythm.Api.Dtos;
using Algorhythm.Business.Interfaces;
using Algorhythm.Business.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Algorhythm.Api.Controllers
{
    [Route("api/exercises")]
    public class ExercisesController : MainController
    {
        private readonly IExerciseRepository _exerciseRepository;
        private readonly IUserRepository _userRepository;
        private readonly IExerciseService _exerciseService;
        private readonly IAlternativeService _alternativeService;
        private readonly IAlternativeRepository _alternativeRepository;
        private readonly IMapper _mapper;

        public ExercisesController(IExerciseRepository exerciseRepository,
                                   IMapper mapper,
                                   IExerciseService exerciseService,
                                   INotifier notifier,
                                   IAlternativeService alternativeService,
                                   IAlternativeRepository alternativeRepository,
                                   IUserRepository userRepository) :
            base(notifier)
        {
            _exerciseRepository = exerciseRepository;
            _mapper = mapper;
            _exerciseService = exerciseService;
            _alternativeService = alternativeService;
            _alternativeRepository = alternativeRepository;
            _userRepository = userRepository;
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

            exercise.AlternativesUpdate = _mapper.Map<IEnumerable<AlternativeDto>>(await _alternativeRepository.GetAlternativesByExercise(id)).ToList();

            return exercise;
        }

        [HttpPost]
        public async Task<ActionResult<ExerciseDto>> Add(ExerciseDto exerciseDto)
        {
            if (!ModelState.IsValid) 
                return CustomResponse(ModelState);

            exerciseDto.Id = null;

            var exercise = _mapper.Map<Exercise>(exerciseDto);

            exercise.Question = GetQuestionFormatted(exercise.Question, exercise.CorrectAlternative);

            await _exerciseService.Add(exercise);

            return CustomResponse(exerciseDto);
        }

        [HttpPut]
        public async Task<ActionResult<ExerciseDto>> Update(ExerciseDto exerciseDto)
        {

            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            var exercise = _mapper.Map<Exercise>(exerciseDto);

            exercise.Question = GetQuestionFormatted(exercise.Question, exercise.CorrectAlternative);

            await _exerciseService.Update(exercise);

            return CustomResponse(exerciseDto);
        }

        [Route("alternative")] 
        [HttpPut]
        public async Task<ActionResult<AlternativeDto>> UpdateAlternative(AlternativeDto alternativeDto)
        {
            if (!ModelState.IsValid)
                return CustomResponse(ModelState);

            var alternative = new Alternative {  Id = alternativeDto.Id, ExerciseId = alternativeDto.ExerciseId, Title =  alternativeDto.Title };

            await _alternativeService.Update(alternative);

            return CustomResponse(alternativeDto);
        }

        [Route("delete")]
        [HttpPut]
        public async Task<ActionResult> Delete(ExerciseDto exerciseDto)
        {
            var exercise = await _exerciseRepository.GetById(_mapper.Map<Exercise>(exerciseDto).Id);

            if (exercise is null)
                return NotFound();

            exercise.DeletedAt = DateTime.Now;

            await _exerciseService.Update(exercise);

            return CustomResponse();
        }

        [HttpGet("exercisestodo")]
        public async Task<ActionResult<ExerciseDto>> GetExercisesByModuleAndUser(int moduleId, Guid? userId)
        {
            if (moduleId == 0 || moduleId > 8 || userId is null)
            {
                NotifyError("Parâmetros inválidos");
                return CustomResponse();
            }

            var user = await _userRepository.GetById(userId.Value);

            if (user is null)
            {
                NotifyError("Usuário não encontrado");
                return CustomResponse();
            }

            var exercises = await _exerciseRepository.GetExerciseAndAlternativesByModule(moduleId, userId.Value);

            var exercisesToDo = _mapper.Map<ExerciseDto>(exercises.Where(w => !w.Users.Any()).FirstOrDefault());

            return exercisesToDo;
        }

        private string GetQuestionFormatted(string question, string correctAnswer)
        {
            if (question.Contains(correctAnswer))
            {
               return question.Replace(correctAnswer, GetUnderLine(correctAnswer));
            }

            return question;
        }

        private string GetUnderLine(string correctAnswer)
        {
            var sb = new StringBuilder();

            for (int i = 0; i < correctAnswer.Length; i++)
            {
                sb.Append('_');
            }

            return sb.ToString();
        }
    }
}
