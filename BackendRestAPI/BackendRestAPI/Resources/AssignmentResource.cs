using System.Text.Json.Serialization;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;

namespace BackendRestAPI.Resources;

public sealed class AssignmentResource
{
    public int AssignmentPk { get; set; }

    public DateOnly CreationDate { get; set; }

    public int ReachablePoints { get; set; }
    
    public string AssignmentType { get; set; }
    
    public string Semester { get; set; }
    
    [JsonIgnore]
    public Subject? SubjectFkNavigation { get; set; }
}