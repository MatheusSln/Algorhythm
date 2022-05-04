using System;

namespace Algorhythm.Business.Models
{
    public abstract class Base : BaseEntity
    {
        protected Base()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
    }

    public abstract class BaseEntity { }
}
