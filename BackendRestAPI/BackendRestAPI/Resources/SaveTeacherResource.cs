using System.ComponentModel.DataAnnotations;

namespace BackendRestAPI.Resources;

public class SaveTeacherResource
{
    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string FirstTitle { get; set; }

    public string LastTitle { get; set; }
    
    [Required]
    public string Password { get; set; } = null!;
}