using BackendRestAPI.Domain.Models;

namespace BackendRestAPI.Domain.Repositories;

public interface ISubjectRepository
{
    Task<IEnumerable<Subject>> ListAsync();
    Task<IEnumerable<Subject>> ListByClassIdAsync(int classId);
}