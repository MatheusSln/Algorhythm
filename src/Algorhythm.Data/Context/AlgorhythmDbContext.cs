using Algorhythm.Business.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Algorhythm.Data.Context
{
    public class AlgorhythmDbContext : DbContext
    {
        public AlgorhythmDbContext(DbContextOptions<AlgorhythmDbContext> options) : base(options) { }

        public DbSet<Module> Modules { get; set; }

        public DbSet<Exercise> Exercises { get; set; }

        public DbSet<Alternative> Alternatives { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AlgorhythmDbContext).Assembly);

            modelBuilder.Entity<User>()
                .HasMany<Exercise>(e => e.Exercises)
                .WithMany(u => u.Users);

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys())) relationship.DeleteBehavior = DeleteBehavior.ClientSetNull; 

            base.OnModelCreating(modelBuilder);
        }
    }
}
