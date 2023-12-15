using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendRestAPI.Persistence.Contexts;

public class AppDbContext : DbContext
{
    public DbSet<Teacher> Teachers { get; set; }
    public AppDbContext()
    {
    }
    
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        //InitializeData();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Assignment>(entity =>
        {
            entity.HasKey(e => e.AssignmentPk).HasName("assignment_pk");

            entity.ToTable("assignment");

            entity.Property(e => e.AssignmentPk)
                .ValueGeneratedNever()
                .HasColumnName("assignment_pk");
            entity.Property(e => e.CreationDate).HasColumnName("creation_date");
            entity.Property(e => e.ReachablePoints).HasColumnName("reachable_points");
            entity.Property(e => e.SubjectFk).HasColumnName("subject_fk");

            entity.HasOne(d => d.SubjectFkNavigation).WithMany(p => p.Assignments)
                .HasForeignKey(d => d.SubjectFk)
                .HasConstraintName("subject_fk");
        });

        modelBuilder.Entity<Class>(entity =>
        {
            entity.HasKey(e => e.PkClass).HasName("class_pk");

            entity.ToTable("class");

            entity.Property(e => e.PkClass)
                .ValueGeneratedNever()
                .HasColumnName("pk_class");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<ClassTeacher>(entity =>
        {
            entity.HasKey(e => e.ClassTeacherPk).HasName("class_teacher_pk");

            entity.ToTable("class_teacher");

            entity.Property(e => e.ClassTeacherPk)
                .ValueGeneratedNever()
                .HasColumnName("class_teacher_pk");
            entity.Property(e => e.ClassFk).HasColumnName("class_fk");
            entity.Property(e => e.TeacherFk).HasColumnName("teacher_fk");

            entity.HasOne(d => d.ClassFkNavigation).WithMany(p => p.ClassTeachers)
                .HasForeignKey(d => d.ClassFk)
                .HasConstraintName("class_fk");

            entity.HasOne(d => d.TeacherFkNavigation).WithMany(p => p.ClassTeachers)
                .HasForeignKey(d => d.TeacherFk)
                .HasConstraintName("teacher_fk");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.PkStudent).HasName("student_pk");

            entity.ToTable("student");

            entity.Property(e => e.PkStudent)
                .ValueGeneratedNever()
                .HasColumnName("pk_student");
            entity.Property(e => e.FkClass).HasColumnName("fk_class");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");

            entity.HasOne(d => d.FkClassNavigation).WithMany(p => p.Students)
                .HasForeignKey(d => d.FkClass)
                .HasConstraintName("class_fk");
        });

        modelBuilder.Entity<StudentAssignment>(entity =>
        {
            entity.HasKey(e => e.StudentAssignmentPk).HasName("student_assignment_pk");

            entity.ToTable("student_assignment");

            entity.Property(e => e.StudentAssignmentPk)
                .ValueGeneratedNever()
                .HasColumnName("student_assignment_pk");
            entity.Property(e => e.AssignmentFk).HasColumnName("assignment_fk");
            entity.Property(e => e.Points).HasColumnName("points");
            entity.Property(e => e.StudentFk).HasColumnName("student_fk");

            entity.HasOne(d => d.AssignmentFkNavigation).WithMany(p => p.StudentAssignments)
                .HasForeignKey(d => d.AssignmentFk)
                .HasConstraintName("assignment_fk");

            entity.HasOne(d => d.StudentFkNavigation).WithMany(p => p.StudentAssignments)
                .HasForeignKey(d => d.StudentFk)
                .HasConstraintName("student_fk");
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.PkSubject).HasName("subject_pk");

            entity.ToTable("subject");

            entity.Property(e => e.PkSubject)
                .ValueGeneratedNever()
                .HasColumnName("pk_subject");
            entity.Property(e => e.ClassFk).HasColumnName("class_fk");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");

            entity.HasOne(d => d.ClassFkNavigation).WithMany(p => p.Subjects)
                .HasForeignKey(d => d.ClassFk)
                .HasConstraintName("class_fk");
        });

        modelBuilder.Entity<Teacher>(entity =>
        {
            entity.HasKey(e => e.PkTeacher).HasName("teacher_pk");

            entity.ToTable("teachers");

            entity.Property(e => e.PkTeacher)
                .ValueGeneratedNever()
                .HasColumnName("pk_teacher");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.FirstTitle)
                .HasMaxLength(255)
                .HasColumnName("first_title");
            entity.Property(e => e.LastTitle)
                .HasMaxLength(255)
                .HasColumnName("last_title");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
        });

    }
    
}