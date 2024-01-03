using System.ComponentModel.DataAnnotations.Schema;
using BackendRestAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace BackendRestAPI.Domain.Models;

public sealed class Teacher : IdentityUser<int>
{
    public int PkTeacher { get; set; }

    public string UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? FirstTitle { get; set; }

    public string? LastTitle { get; set; }

    public string Password { get; set; } = null!;

    public ICollection<ClassTeacher> ClassTeachers { get; set; } = new List<ClassTeacher>();
    
    [NotMapped]
    public override string NormalizedUserName { get; set; }
    [NotMapped]
    public override string NormalizedEmail { get; set; }

}
public class ApplicationRole : IdentityRole<int>
{
    // Add additional properties here
}
