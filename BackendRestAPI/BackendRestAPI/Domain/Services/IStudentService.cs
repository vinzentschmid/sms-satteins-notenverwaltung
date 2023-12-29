using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Services;

public interface IStudentService
{
    Task<IEnumerable<Student>> ListAsync();

    Task<IEnumerable<Student>> ListByClassIdAsync(int classId);

}