using BackendRestAPI.Models;

namespace BackendRestAPI.Resources;

public class StudentResource
{
    public int PkStudent { get; set; }

    public string Name { get; set; }

    public int FkClass { get; set; }

}