namespace BackendRestAPI.Domain.Models;

public partial class ClassTeacher
{
    public int ClassTeacherPk { get; set; }

    public int TeacherFk { get; set; }

    public int ClassFk { get; set; }

    public virtual Class ClassFkNavigation { get; set; }

    public virtual Teacher TeacherFkNavigation { get; set; }
}
