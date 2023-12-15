using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Models;

namespace BackendRestAPI.Services;

public class TeacherService : ITeacherService
{
    private readonly ITeacherRepository _teacherRepository;

    public TeacherService(ITeacherRepository teacherRepository)
    {
        this._teacherRepository = teacherRepository;
    }
    public async Task<IEnumerable<Teacher>> ListAsync()
    {
        return await _teacherRepository.ListAsync();
    }
}