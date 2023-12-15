using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;

namespace BackendRestAPI.Services;

public interface ITeacherService
{
    Task<IEnumerable<Teacher>> ListAsync();
}