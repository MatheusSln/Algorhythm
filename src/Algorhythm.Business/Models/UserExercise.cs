using System;
using System.Collections.Generic;

namespace Algorhythm.Business.Models
{
    public class UserExercise : Base
    {
        public List<User> Users { get; set; }

        public List<Exercise> Exercises { get; set; }
    }
}
