namespace BackendRestAPI.Resources;

public class SaveStudentAssignmentResource
{
    public decimal Points { get; set; }
    
    public int StudentFk { get; set; }

    public int AssignmentFk { get; set; }
}