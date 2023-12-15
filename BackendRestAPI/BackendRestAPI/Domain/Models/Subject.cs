using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Models;

public partial class Subject
{
    public int PkSubject { get; set; }

    public string Name { get; set; }

    public int ClassFk { get; set; }

    public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();

    public virtual Class? ClassFkNavigation { get; set; }
}
