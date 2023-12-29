using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Repositories;

public interface IAssignmentRepository
{
    Task<IEnumerable<Assignment>> ListAsync();
    Task<IEnumerable<Assignment>> ListBySubjectIdAsync(int subjectId);
}