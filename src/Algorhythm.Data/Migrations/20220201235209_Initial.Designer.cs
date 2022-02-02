﻿// <auto-generated />
using System;
using Algorhythm.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Algorhythm.Data.Migrations
{
    [DbContext(typeof(AlgorhythmDbContext))]
    [Migration("20220201235209_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.13")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Algorhythm.Business.Models.Alternative", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ExerciseId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("ExerciseId");

                    b.ToTable("Alternatives");
                });

            modelBuilder.Entity("Algorhythm.Business.Models.Exercise", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CorrectAnswer")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<Guid>("ModuleId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Question")
                        .IsRequired()
                        .HasColumnType("varchar(300)");

                    b.HasKey("Id");

                    b.HasIndex("ModuleId");

                    b.ToTable("Exercises");
                });

            modelBuilder.Entity("Algorhythm.Business.Models.Module", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.HasKey("Id");

                    b.ToTable("Modules");
                });

            modelBuilder.Entity("Algorhythm.Business.Models.Alternative", b =>
                {
                    b.HasOne("Algorhythm.Business.Models.Exercise", "Exercise")
                        .WithMany("Alternatives")
                        .HasForeignKey("ExerciseId")
                        .IsRequired();

                    b.Navigation("Exercise");
                });

            modelBuilder.Entity("Algorhythm.Business.Models.Exercise", b =>
                {
                    b.HasOne("Algorhythm.Business.Models.Module", "Module")
                        .WithMany("Exercises")
                        .HasForeignKey("ModuleId")
                        .IsRequired();

                    b.Navigation("Module");
                });

            modelBuilder.Entity("Algorhythm.Business.Models.Exercise", b =>
                {
                    b.Navigation("Alternatives");
                });

            modelBuilder.Entity("Algorhythm.Business.Models.Module", b =>
                {
                    b.Navigation("Exercises");
                });
#pragma warning restore 612, 618
        }
    }
}
