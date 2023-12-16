using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Services.Communication;

namespace BackendRestAPI.Domain.Services;

public interface ITeacherService
{
    Task<IEnumerable<Teacher>> ListAsync();
    Task<TeacherResponse> FindOneAsync(int id);
}