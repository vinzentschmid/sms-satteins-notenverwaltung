using System.Text.Json.Serialization;

namespace BackendRestAPI.Resources;

public class StudentAssignmentResource
{
    public int StudentAssignmentPk { get; set; }

    public int Points { get; set; }

    public  AssignmentResource AssignmentFkNavigation { get; set; }

    public  StudentResource StudentFkNavigation { get; set; }
}