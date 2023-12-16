using System.Text.Json.Serialization;
using BackendRestAPI.Domain.Models;

namespace BackendRestAPI.Resources;

public class SubjectResource
{
    public int PkSubject { get; set; }

    public string Name { get; set; }

    public int ClassFk { get; set; }
    
    [JsonIgnore]
    public virtual Class? ClassFkNavigation { get; set; }
}