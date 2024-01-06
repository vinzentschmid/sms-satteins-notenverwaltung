using BackendRestAPI.Domain.Models;

namespace BackendRestAPI.Domain.Services.Communication;

public class AssignmentResponse : BaseResponse
{
    public Assignment Assignment { get; private set;  }
    private AssignmentResponse(bool success, string message, Assignment assignment) : base(success, message)
    {
        Assignment = assignment;
    }
    public AssignmentResponse(Assignment assignment) : this(true, string.Empty, assignment)
    { }
    
    public AssignmentResponse(string message) : this(false, message, null)
    { }
}