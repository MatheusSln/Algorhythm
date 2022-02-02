using Algorhythm.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Algorhythm.Data.Mappings
{
    public class ModuleMapping : IEntityTypeConfiguration<Module>
    {
        public void Configure(EntityTypeBuilder<Module> builder)
        {
            builder.HasKey(m => m.Id);

            builder.Property(m => m.Title)
                .IsRequired()
                .HasColumnType("varchar(200)");

            // 1 : N => Module : Exercises

            builder.HasMany(m => m.Exercises)
                .WithOne(e => e.Module)
                .HasForeignKey(e => e.ModuleId);

            builder.ToTable("Modules");
        }
    }
}
