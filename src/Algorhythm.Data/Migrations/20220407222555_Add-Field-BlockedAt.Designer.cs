﻿// <auto-generated />
using System;
using Algorhythm.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Algorhythm.Data.Migrations
{
    [DbContext(typeof(AlgorhythmDbContext))]
    [Migration("20220407222555_Add-Field-BlockedAt")]
    partial class AddFieldBlockedAt
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

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

                    b.ToTable("Alternatives", (string)null);
                });

            modelBuilder.Entity("Algorhythm.Business.Models.Exercise", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("CorrectAlternative")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Explanation")
                        .HasColumnType("varchar(300)");

                    b.Property<int>("ModuleId")
                        .HasColumnType("int");

                    b.Property<string>("Question")
                        .IsRequired()
                        .HasColumnType("varchar(300)");

                    b.HasKey("Id");

                    b.HasIndex("ModuleId");

                    b.ToTable("Exercises", (string)null);
                });

            modelBuilder.Entity("Algorhythm.Business.Models.Module", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("varchar(200)");

                    b.HasKey("Id");

                    b.ToTable("Modules", (string)null);
                });

            modelBuilder.Entity("Algorhythm.Business.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("BlockedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(250)");

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(150)");

                    b.HasKey("Id");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("ExerciseUser", b =>
                {
                    b.Property<Guid>("ExercisesId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UsersId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ExercisesId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("ExerciseUser");
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

            modelBuilder.Entity("ExerciseUser", b =>
                {
                    b.HasOne("Algorhythm.Business.Models.Exercise", null)
                        .WithMany()
                        .HasForeignKey("ExercisesId")
                        .IsRequired();

                    b.HasOne("Algorhythm.Business.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .IsRequired();
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
