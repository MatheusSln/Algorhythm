using Algorhythm.Business.Interfaces;
using Algorhythm.Data.Context;
using Algorhythm.Data.Repository;
using Microsoft.Extensions.DependencyInjection;

namespace Algorhythm.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddScoped<AlgorhythmDbContext>();
            services.AddScoped<IAlternativeRepository, AlternativeRepository>();
            services.AddScoped<IExerciseRepository, ExerciseRepository>();
            services.AddScoped<IModuleRepository, ModuleRepository>();

            return services;
        }
    }
}
