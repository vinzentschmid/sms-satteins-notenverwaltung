using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Services;

public interface IAssignmentService
{
    Task<IEnumerable<Assignment>> ListAsync();
}