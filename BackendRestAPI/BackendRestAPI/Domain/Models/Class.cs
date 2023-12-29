using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Models;

public partial class Class
{
    public int PkClass { get; set; }

    public string Name { get; set; } = null!;
    
    public DateOnly Year { get; set; }

    public virtual ICollection<ClassTeacher> ClassTeachers { get; set; } = new List<ClassTeacher>();

    public virtual ICollection<Student> Students { get; set; } = new List<Student>();

    public virtual ICollection<Subject> Subjects { get; set; } = new List<Subject>();
}
