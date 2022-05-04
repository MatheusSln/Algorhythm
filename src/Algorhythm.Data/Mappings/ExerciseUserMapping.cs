using Algorhythm.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Algorhythm.Data.Mappings
{
    public class ExerciseUserMapping : IEntityTypeConfiguration<ExerciseUser>
    {
        public void Configure(EntityTypeBuilder<ExerciseUser> builder)
        {
            builder.HasKey(x => new { x.ExercisesId, x.UsersId });

            builder.HasOne(x => x.Exercise)
                .WithMany(x => x.ExerciseUsers)
                .HasForeignKey(x => x.ExercisesId);
                

            builder.HasOne(x => x.User)
                   .WithMany(x => x.ExerciseUser)
                   .HasForeignKey(x => x.UsersId);

            builder.ToTable("ExerciseUser");
        }
    }
}
