using System.ComponentModel;
using BackendRestAPI.Models;
using NpgsqlTypes;

namespace BackendRestAPI.Domain.Models;

public partial class Assignment
{
    public int AssignmentPk { get; set; }

    public DateOnly CreationDate { get; set; }

    public int ReachablePoints { get; set; }

    public int? SubjectFk { get; set; }
    
    public EAssignmentType AssignmentType { get; set; }
    
    public ESemester Semester { get; set; }

    public virtual ICollection<StudentAssignment> StudentAssignments { get; set; } = new List<StudentAssignment>();

    public virtual Subject? SubjectFkNavigation { get; set; }
}

public enum EAssignmentType
{
    [Description("Test")]
    Test,
    [Description("Homework")]
    Homework,
    [Description("Check")]
    Check,
    [Description("Framework")]
    Framework
}

public enum ESemester
{
    [Description("1.Semester")]
    FirstSemester,
    [Description("2.Semester")]
    SecondSemester
}

