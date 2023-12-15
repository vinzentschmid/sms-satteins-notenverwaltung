using System;
using System.Collections.Generic;
using BackendRestAPI.Domain.Models;

namespace BackendRestAPI.Models;

public partial class Student
{
    public int PkStudent { get; set; }

    public string Name { get; set; } = null!;

    public int? FkClass { get; set; }

    public virtual Class? FkClassNavigation { get; set; }

    public virtual ICollection<StudentAssignment> StudentAssignments { get; set; } = new List<StudentAssignment>();
}
