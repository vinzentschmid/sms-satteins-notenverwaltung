using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Models;

public partial class Teacher
{
    public int PkTeacher { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? FirstTitle { get; set; }

    public string? LastTitle { get; set; }

    public string Password { get; set; } = null!;

    public virtual ICollection<ClassTeacher> ClassTeachers { get; set; } = new List<ClassTeacher>();
}
