using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;

namespace BackendRestAPI.Resources;

public sealed class ClassResource
{
    public ClassResource(string name)
    {
        Name = name;
    }

    public int PkClass { get; set; }

    public string Name { get; set; }
    
    public ICollection<StudentResource> Students { get; set; } = new List<StudentResource>();
    
    public  ICollection<SubjectResource> Subjects { get; set; } = new List<SubjectResource>();


}