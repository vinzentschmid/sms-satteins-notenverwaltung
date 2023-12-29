using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;

namespace BackendRestAPI.Resources;

public sealed class ClassResource
{
    public ClassResource(string name)
    {
        Name = name;
    }

    public int PkClass { get; set; }

    public string Name { get; set; }
    
    public DateOnly Year { get; set; }
    

}