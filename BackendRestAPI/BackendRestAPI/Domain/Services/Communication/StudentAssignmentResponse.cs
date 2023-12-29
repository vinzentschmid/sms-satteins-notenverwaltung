using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Services.Communication;

public class StudentAssignmentResponse : BaseResponse
{
    public StudentAssignment? StudentAssignment { get; private set; }

    private StudentAssignmentResponse(bool success, string message, StudentAssignment? studentAssignment) : base(success, message)
    {
        StudentAssignment = studentAssignment;
    }
    public StudentAssignmentResponse(StudentAssignment studentAssignment) : this(true, string.Empty, studentAssignment){}
    
    public StudentAssignmentResponse(string message) : this(false, message, null)
    {
    }
}