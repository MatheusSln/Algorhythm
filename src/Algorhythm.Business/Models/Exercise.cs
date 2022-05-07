using System;
using System.Collections.Generic;

namespace Algorhythm.Business.Models
{
    public class Exercise : Base
    {
        public int ModuleId { get; set; }

        public string Question { get; set; }

        public string CorrectAlternative { get; set; }

        public string Explanation { get; set; }

        public DateTime? DeletedAt { get; set; }

        // EF Relations
        public Module Module { get; set; }

        public IEnumerable<Alternative> Alternatives { get; set; }

        public List<ExerciseUser> ExerciseUsers { get; set; }
    }
}
