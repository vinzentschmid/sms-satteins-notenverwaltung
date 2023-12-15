using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Services.Communication;

public class ClassResponse : BaseResponse
{
    public Class? Class { get; private set; }

    private ClassResponse(bool success, string message, Class? classObject) : base(success, message)
    {
        Class = classObject;
    }

    public ClassResponse(Class classObjects) : this(true, string.Empty, classObjects){}
    
    public ClassResponse(string message) : this(false, message, null)
    {
    }
    
    public ClassResponse(bool success, string message) : this(success, message, null)
    {
    }
}