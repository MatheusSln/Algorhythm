using Algorhythm.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Algorhythm.Data.Mappings
{
    public class ExcerciseMapping : IEntityTypeConfiguration<Exercise>
    {
        public void Configure(EntityTypeBuilder<Exercise> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.Question)
                .IsRequired()
                .HasColumnType("varchar(300)");

            builder.Property(e => e.CorrectAlternative)
                .IsRequired()
                .HasColumnType("varchar(100)");

            builder.Property(e => e.Explanation)
                .HasColumnType("varchar(300)");

            // 1 : N Excercise : Alternatives

            builder.HasMany(e => e.Alternatives)
                .WithOne(a => a.Exercise)
                .HasForeignKey(a => a.ExerciseId);

            builder.ToTable("Exercises");
        }
    }
}
