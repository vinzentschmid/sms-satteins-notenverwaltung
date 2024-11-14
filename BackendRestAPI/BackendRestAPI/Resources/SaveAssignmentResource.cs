using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;

namespace BackendRestAPI.Resources;

public class SaveAssignmentResource
{

    public DateOnly CreationDate { get; set; }

    public decimal ReachablePoints { get; set; }

    public int SubjectFk { get; set; }
    
    public string AssignmentType { get; set; }
    
    public string Semester { get; set; }

}