using Algorhythm.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Algorhythm.Data.Mappings
{
    public class AlternativeMapping : IEntityTypeConfiguration<Alternative>
    {
        public void Configure(EntityTypeBuilder<Alternative> builder)
        {
            builder.HasKey(a => a.Id);

            builder.Property(a => a.Title)
                .IsRequired()
                .HasColumnType("varchar(100)");

            builder.ToTable("Alternatives");
        }
    }
}
