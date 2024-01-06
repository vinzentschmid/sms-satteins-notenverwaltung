using BackendRestAPI.Models;

namespace BackendRestAPI.Domain.Repositories;

public interface IStudentAssignmentRepository
{
    Task<IEnumerable<StudentAssignment>> ListAsync();
    
    void Update(StudentAssignment studentAssignment);
    
    Task<StudentAssignment> FindByIdAsync(int id);

    Task AddAsync(StudentAssignment studentAssignment);

}