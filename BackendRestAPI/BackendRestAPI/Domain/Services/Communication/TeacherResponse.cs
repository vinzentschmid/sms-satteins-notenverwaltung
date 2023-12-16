using BackendRestAPI.Domain.Models;

namespace BackendRestAPI.Domain.Services.Communication;

public class TeacherResponse : BaseResponse
{
    public Teacher? Teacher { get; private set; }

    private TeacherResponse(bool success, string message, Teacher? teacher) : base(success, message)
    {
        Teacher = teacher;
    }
    
    public TeacherResponse(Teacher teacher) : this(true, string.Empty, teacher){}
    
    public TeacherResponse(string message) : this(false, message, null)
    {
    }
    
    public TeacherResponse(bool success, string message) : this(success, message, null)
    {
    }
}