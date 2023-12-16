using BackendRestAPI.Domain.Models;

namespace BackendRestAPI.Domain.Services;

public interface ISubjectService
{
    Task<IEnumerable<Subject>> ListAsync();

}