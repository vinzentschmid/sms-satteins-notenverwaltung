namespace BackendRestAPI.Resources;

public class SaveStudentAssignmentResource
{
    public int Points { get; set; }
    
    public int StudentFk { get; set; }

    public int AssignmentFk { get; set; }
}