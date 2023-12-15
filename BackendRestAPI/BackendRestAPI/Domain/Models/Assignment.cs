using System;
using System.Collections.Generic;
using BackendRestAPI.Domain.Models;

namespace BackendRestAPI.Models;

public partial class Assignment
{
    public int AssignmentPk { get; set; }

    public DateOnly CreationDate { get; set; }

    public int ReachablePoints { get; set; }

    public int? SubjectFk { get; set; }

    public virtual ICollection<StudentAssignment> StudentAssignments { get; set; } = new List<StudentAssignment>();

    public virtual Subject? SubjectFkNavigation { get; set; }
}
