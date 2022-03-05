﻿using Algorhythm.Business.Enum;
using System.Collections.Generic;

namespace Algorhythm.Business.Models
{
    public class User : Base
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public int Age { get; set; }

        public Level Level { get; set; }

        public List<Exercise> Exercises { get; set; }
    }
}