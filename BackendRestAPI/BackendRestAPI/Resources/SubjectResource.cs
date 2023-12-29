using System.Text.Json.Serialization;
using BackendRestAPI.Domain.Models;

namespace BackendRestAPI.Resources;

public class SubjectResource
{
    public int PkSubject { get; set; }

    public string Name { get; set; }
    
    public  ICollection<AssignmentResource> Assignments { get; set; } = new List<AssignmentResource>();

    [JsonIgnore]
    public virtual Class? ClassFkNavigation { get; set; }
}