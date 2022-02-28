using Algorhythm.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Algorhythm.Data.Mappings
{
    public class UserMapping : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(m => m.Id);

            builder.Property(m => m.Name)
                .IsRequired()
                .HasColumnType("varchar(150)");

            builder.Property(m => m.Email)
                .IsRequired()
                .HasColumnType("varchar(250)");

            builder.Property(m => m.Age)
                .IsRequired();

            builder.ToTable("Users");
        }
    }
}
