using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Repositories;

public interface IClassRepository
{
    Task<IEnumerable<Class>> ListAsync();
    Task<Class> FindByIdAsync(int id);
}