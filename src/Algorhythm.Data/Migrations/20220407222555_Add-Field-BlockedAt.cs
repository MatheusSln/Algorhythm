using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Algorhythm.Data.Migrations
{
    public partial class AddFieldBlockedAt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BlockedAt",
                table: "Users",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BlockedAt",
                table: "Users");
        }
    }
}
