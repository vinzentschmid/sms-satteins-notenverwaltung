using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Repositories;

public interface IStudentRepository
{
    Task<IEnumerable<Student>> ListAsync();

    Task<IEnumerable<Student>> ListByClassIdAsync(int classId);
}