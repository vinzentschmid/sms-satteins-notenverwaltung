using BackendRestAPI.Domain.Services.Communication;
using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Services;

public interface IStudentAssignmentService
{
    Task<IEnumerable<StudentAssignment>> ListAsync();
    
    Task<StudentAssignmentResponse> UpdateAsync(int id, StudentAssignment studentAssignment);
    
    Task<StudentAssignmentResponse> FindOneAsync(int id);

}