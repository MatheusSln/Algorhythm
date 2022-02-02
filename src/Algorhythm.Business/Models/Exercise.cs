using System;
using System.Collections.Generic;

namespace Algorhythm.Business.Models
{
    public class Exercise : Base
    {
        public Guid ModuleId { get; set; }

        public string Question { get; set; }

        public string CorrectAnswer { get; set; }

        // EF Relations
        public Module Module { get; set; }

        public IEnumerable<Alternative> Alternatives { get; set; }
    }
}
