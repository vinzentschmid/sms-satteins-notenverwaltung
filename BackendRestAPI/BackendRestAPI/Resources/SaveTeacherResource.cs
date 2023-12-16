using System.ComponentModel.DataAnnotations;

namespace BackendRestAPI.Resources;

public class SaveTeacherResource
{
    public string Name { get; set; } 

    public string Email { get; set; }

    public string FirstTitle { get; set; }

    public string LastTitle { get; set; }
    
    [Required]
    public string Password { get; set; }
}