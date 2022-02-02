using System;

namespace Algorhythm.Business.Models
{
    public class Alternative : Base
    {
        public Guid ExerciseId { get; set; }

        public string Title { get; set; }

        // EF Relations
        public Exercise Exercise { get; set; }
    }
}
