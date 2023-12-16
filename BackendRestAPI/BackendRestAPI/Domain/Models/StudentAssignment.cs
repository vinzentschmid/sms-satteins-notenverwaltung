using System;
using System.Collections.Generic;
using BackendRestAPI.Domain.Models;

namespace BackendRestAPI.Models;

public partial class StudentAssignment
{
    public int StudentAssignmentPk { get; set; }

    public int? StudentFk { get; set; }

    public int? AssignmentFk { get; set; }

    public int? Points { get; set; }

    public virtual Assignment? AssignmentFkNavigation { get; set; }

    public virtual Student? StudentFkNavigation { get; set; }
}
