﻿using Algorhythm.Business.Enum;
using System.Collections.Generic;

namespace Algorhythm.Business.Models
{
    public class Module : Base
    {
        public string Title { get; set; }

        public Level Level { get; set; }

        // EF Relations
        public IEnumerable<Exercise> Exercises { get; set; }
    }
}
