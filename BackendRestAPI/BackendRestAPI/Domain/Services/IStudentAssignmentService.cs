using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Services;

public interface IStudentAssignmentService
{
    Task<IEnumerable<StudentAssignment>> ListAsync();

}