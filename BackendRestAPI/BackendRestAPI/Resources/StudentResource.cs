using System.Text.Json.Serialization;
using BackendRestAPI.Domain.Models;

namespace BackendRestAPI.Resources;

public class StudentResource
{
    public int PkStudent { get; set; }

    public string Name { get; set; }

    
    [JsonIgnore]
    public virtual Class? FkClassNavigation { get; set; }
}