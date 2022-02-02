using System;

namespace Algorhythm.Business.Models
{
    public abstract class Base
    {
        protected Base()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
    }
}
