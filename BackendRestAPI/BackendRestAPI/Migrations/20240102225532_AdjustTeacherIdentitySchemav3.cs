using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendRestAPI.Migrations
{
    /// <inheritdoc />
    public partial class AdjustTeacherIdentitySchemav3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserClaims_teachers_UserId",
                table: "AspNetUserClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserLogins_teachers_UserId",
                table: "AspNetUserLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_teachers_UserId",
                table: "AspNetUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserTokens_teachers_UserId",
                table: "AspNetUserTokens");

            migrationBuilder.DropForeignKey(
                name: "teacher_fk",
                table: "class_teacher");

            migrationBuilder.DropPrimaryKey(
                name: "teacher_pk",
                table: "teachers");

            migrationBuilder.DropIndex(
                name: "EmailIndex",
                table: "teachers");

            migrationBuilder.DropColumn(
                name: "pk_teacher",
                table: "teachers");

            migrationBuilder.DropColumn(
                name: "NormalizedEmail",
                table: "teachers");

            migrationBuilder.AddPrimaryKey(
                name: "Id",
                table: "teachers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserClaims_teachers_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserLogins_teachers_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalTable: "teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserRoles_teachers_UserId",
                table: "AspNetUserRoles",
                column: "UserId",
                principalTable: "teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserTokens_teachers_UserId",
                table: "AspNetUserTokens",
                column: "UserId",
                principalTable: "teachers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "teacher_fk",
                table: "class_teacher",
                column: "teacher_fk",
                principalTable: "teachers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserClaims_teachers_UserId",
                table: "AspNetUserClaims");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserLogins_teachers_UserId",
                table: "AspNetUserLogins");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_teachers_UserId",
                table: "AspNetUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserTokens_teachers_UserId",
                table: "AspNetUserTokens");

            migrationBuilder.DropForeignKey(
                name: "teacher_fk",
                table: "class_teacher");

            migrationBuilder.DropPrimaryKey(
                name: "Id",
                table: "teachers");

            migrationBuilder.AddColumn<int>(
                name: "pk_teacher",
                table: "teachers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedEmail",
                table: "teachers",
                type: "character varying(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "teacher_pk",
                table: "teachers",
                column: "pk_teacher");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "teachers",
                column: "NormalizedEmail");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserClaims_teachers_UserId",
                table: "AspNetUserClaims",
                column: "UserId",
                principalTable: "teachers",
                principalColumn: "pk_teacher",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserLogins_teachers_UserId",
                table: "AspNetUserLogins",
                column: "UserId",
                principalTable: "teachers",
                principalColumn: "pk_teacher",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserRoles_teachers_UserId",
                table: "AspNetUserRoles",
                column: "UserId",
                principalTable: "teachers",
                principalColumn: "pk_teacher",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserTokens_teachers_UserId",
                table: "AspNetUserTokens",
                column: "UserId",
                principalTable: "teachers",
                principalColumn: "pk_teacher",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "teacher_fk",
                table: "class_teacher",
                column: "teacher_fk",
                principalTable: "teachers",
                principalColumn: "pk_teacher");
        }
    }
}
