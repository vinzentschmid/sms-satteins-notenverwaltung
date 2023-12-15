using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Services.Communication;
using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Services;

public interface IClassService
{
    Task<IEnumerable<Class>> ListAsync();
    
    Task<ClassResponse> FindOneAsync(int id);

}