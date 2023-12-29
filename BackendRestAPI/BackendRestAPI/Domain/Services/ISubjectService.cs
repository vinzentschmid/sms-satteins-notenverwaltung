using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Services.Communication;

namespace BackendRestAPI.Domain.Services;

public interface ISubjectService
{
    Task<IEnumerable<Subject>> ListAsync();

    Task<IEnumerable<Subject>> ListByClassIdAsync(int classId);

}