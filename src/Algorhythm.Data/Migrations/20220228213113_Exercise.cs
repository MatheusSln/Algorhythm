using Microsoft.EntityFrameworkCore.Migrations;

namespace Algorhythm.Data.Migrations
{
    public partial class Exercise : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Explanation",
                table: "Exercises",
                type: "varchar(300)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Explanation",
                table: "Exercises");
        }
    }
}
