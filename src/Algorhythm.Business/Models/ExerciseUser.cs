using System;
using System.Collections.Generic;

namespace Algorhythm.Business.Models
{
    public class ExerciseUser : BaseEntity
    {
        public Guid ExercisesId { get; set; }

        public Guid UsersId { get; set; }

        //EF relaions

        public User User { get; set; }
        public Exercise Exercise { get; set; }
    }
}
