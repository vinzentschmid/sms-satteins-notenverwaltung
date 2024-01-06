using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Services.Communication;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;

namespace BackendRestAPI.Domain.Services;

public interface IAssignmentService
{
    Task<IEnumerable<Assignment>> ListAsync();

    Task<IEnumerable<Assignment>> ListBySubjectIdAsync(int subjectId);
    
    Task<AssignmentResponse> SaveAsync(Assignment assignment);

}