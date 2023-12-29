using BackendRestAPI.Domain.Models;

namespace BackendRestAPI.Domain.Services.Communication;

public class SubjectResponse : BaseResponse
{
    public IEnumerable<Subject>? Subjects { get; private set; }

    private SubjectResponse(bool success, string message, IEnumerable<Subject>? subjects) : base(success, message)
    {
        Subjects = subjects;
    }
    
    public SubjectResponse( IEnumerable<Subject> subjects) : this(true, string.Empty, subjects){}

   
}