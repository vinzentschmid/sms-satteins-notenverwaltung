using BackendRestAPI.Domain.Models;

namespace BackendRestAPI.Domain.Services;

public interface ITeacherService
{
    Task<IEnumerable<Teacher>> ListAsync();
}