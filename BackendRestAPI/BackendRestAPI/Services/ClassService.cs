using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Domain.Services.Communication;
using BackendRestAPI.Models;

namespace BackendRestAPI.Services;

public class ClassService : IClassService
{
    private readonly IClassRepository _classRepository;

    public ClassService(IClassRepository classRepository)
    {
        this._classRepository = classRepository;
    }
    
    public async Task<IEnumerable<Class>> ListAsync()
    {
        return await _classRepository.ListAsync();
    }

    public async Task<ClassResponse> FindOneAsync(int id)
    {
        var existingClass = await this._classRepository.FindByIdAsync(id);
        return new ClassResponse(existingClass);
    }
}