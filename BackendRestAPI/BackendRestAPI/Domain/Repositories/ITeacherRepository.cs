using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Repositories;

public interface ITeacherRepository
{
    Task<IEnumerable<Teacher>> ListAsync();
    
    Task<Teacher> FindByIdAsync(int id);

}