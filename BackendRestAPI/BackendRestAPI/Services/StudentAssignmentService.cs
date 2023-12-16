using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Models;

namespace BackendRestAPI.Services;

public class StudentAssignmentService : IStudentAssignmentService
{
    
    private readonly IStudentAssignmentRepository _studentAssignmentRepository;

    public StudentAssignmentService(IStudentAssignmentRepository studentAssignmentRepository)
    {
        this._studentAssignmentRepository = studentAssignmentRepository;
    }
    public async Task<IEnumerable<StudentAssignment>> ListAsync()
    {
        return await _studentAssignmentRepository.ListAsync();
    }
}