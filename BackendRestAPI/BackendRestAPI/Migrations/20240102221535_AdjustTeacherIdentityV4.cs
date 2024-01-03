using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendRestAPI.Migrations
{
    /// <inheritdoc />
    public partial class AdjustTeacherIdentityV4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "name",
                table: "teachers",
                newName: "userName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userName",
                table: "teachers",
                newName: "name");
        }
    }
}
