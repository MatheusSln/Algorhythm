using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Algorhythm.Data.Migrations
{
    public partial class addfielddeletedAt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Exercises",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "Exercises");
        }
    }
}
