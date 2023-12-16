using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Repositories;

public interface IStudentAssignmentRepository
{
    Task<IEnumerable<StudentAssignment>> ListAsync();
}