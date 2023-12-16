using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackendRestAPI.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "class",
                columns: table => new
                {
                    pk_class = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("class_pk", x => x.pk_class);
                });

            migrationBuilder.CreateTable(
                name: "teachers",
                columns: table => new
                {
                    pk_teacher = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    first_title = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    last_title = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    password = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("teacher_pk", x => x.pk_teacher);
                });

            migrationBuilder.CreateTable(
                name: "student",
                columns: table => new
                {
                    pk_student = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    fk_class = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("student_pk", x => x.pk_student);
                    table.ForeignKey(
                        name: "class_fk",
                        column: x => x.fk_class,
                        principalTable: "class",
                        principalColumn: "pk_class");
                });

            migrationBuilder.CreateTable(
                name: "subject",
                columns: table => new
                {
                    pk_subject = table.Column<int>(type: "integer", nullable: false),
                    name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    class_fk = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("subject_pk", x => x.pk_subject);
                    table.ForeignKey(
                        name: "class_fk",
                        column: x => x.class_fk,
                        principalTable: "class",
                        principalColumn: "pk_class",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "class_teacher",
                columns: table => new
                {
                    class_teacher_pk = table.Column<int>(type: "integer", nullable: false),
                    teacher_fk = table.Column<int>(type: "integer", nullable: true),
                    class_fk = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("class_teacher_pk", x => x.class_teacher_pk);
                    table.ForeignKey(
                        name: "class_fk",
                        column: x => x.class_fk,
                        principalTable: "class",
                        principalColumn: "pk_class");
                    table.ForeignKey(
                        name: "teacher_fk",
                        column: x => x.teacher_fk,
                        principalTable: "teachers",
                        principalColumn: "pk_teacher");
                });

            migrationBuilder.CreateTable(
                name: "assignment",
                columns: table => new
                {
                    assignment_pk = table.Column<int>(type: "integer", nullable: false),
                    creation_date = table.Column<DateOnly>(type: "date", nullable: false),
                    reachable_points = table.Column<int>(type: "integer", nullable: false),
                    subject_fk = table.Column<int>(type: "integer", nullable: true),
                    assignment_type = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("assignment_pk", x => x.assignment_pk);
                    table.ForeignKey(
                        name: "subject_fk",
                        column: x => x.subject_fk,
                        principalTable: "subject",
                        principalColumn: "pk_subject");
                });

            migrationBuilder.CreateTable(
                name: "student_assignment",
                columns: table => new
                {
                    student_assignment_pk = table.Column<int>(type: "integer", nullable: false),
                    student_fk = table.Column<int>(type: "integer", nullable: true),
                    assignment_fk = table.Column<int>(type: "integer", nullable: true),
                    points = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("student_assignment_pk", x => x.student_assignment_pk);
                    table.ForeignKey(
                        name: "assignment_fk",
                        column: x => x.assignment_fk,
                        principalTable: "assignment",
                        principalColumn: "assignment_pk");
                    table.ForeignKey(
                        name: "student_fk",
                        column: x => x.student_fk,
                        principalTable: "student",
                        principalColumn: "pk_student");
                });

            migrationBuilder.CreateIndex(
                name: "IX_assignment_subject_fk",
                table: "assignment",
                column: "subject_fk");

            migrationBuilder.CreateIndex(
                name: "IX_class_teacher_class_fk",
                table: "class_teacher",
                column: "class_fk");

            migrationBuilder.CreateIndex(
                name: "IX_class_teacher_teacher_fk",
                table: "class_teacher",
                column: "teacher_fk");

            migrationBuilder.CreateIndex(
                name: "IX_student_fk_class",
                table: "student",
                column: "fk_class");

            migrationBuilder.CreateIndex(
                name: "IX_student_assignment_assignment_fk",
                table: "student_assignment",
                column: "assignment_fk");

            migrationBuilder.CreateIndex(
                name: "IX_student_assignment_student_fk",
                table: "student_assignment",
                column: "student_fk");

            migrationBuilder.CreateIndex(
                name: "IX_subject_class_fk",
                table: "subject",
                column: "class_fk");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "class_teacher");

            migrationBuilder.DropTable(
                name: "student_assignment");

            migrationBuilder.DropTable(
                name: "teachers");

            migrationBuilder.DropTable(
                name: "assignment");

            migrationBuilder.DropTable(
                name: "student");

            migrationBuilder.DropTable(
                name: "subject");

            migrationBuilder.DropTable(
                name: "class");
        }
    }
}
