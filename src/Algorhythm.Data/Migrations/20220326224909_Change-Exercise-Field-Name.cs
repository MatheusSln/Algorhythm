using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Algorhythm.Data.Migrations
{
    public partial class ChangeExerciseFieldName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CorrectAnswer",
                table: "Exercises",
                newName: "CorrectAlternative");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CorrectAlternative",
                table: "Exercises",
                newName: "CorrectAnswer");
        }
    }
}
