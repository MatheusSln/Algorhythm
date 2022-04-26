using System;
using System.Collections.Generic;

namespace Algorhythm.Business.Models
{
    public class ExerciseUser : Base
    {
        public Guid ExercisesId { get; set; }

        public Guid UsersId { get; set; }
    }
}
