using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Domain.Services.Communication;
using BackendRestAPI.Models;

namespace BackendRestAPI.Services;

public class StudentAssignmentService : IStudentAssignmentService
{
    
    private readonly IStudentAssignmentRepository _studentAssignmentRepository;
    private readonly IUnitOfWork _unitOfWork;

    public StudentAssignmentService(IStudentAssignmentRepository studentAssignmentRepository, IUnitOfWork unitOfWork)
    {
        this._studentAssignmentRepository = studentAssignmentRepository;
        this._unitOfWork = unitOfWork;

    }
    public async Task<IEnumerable<StudentAssignment>> ListAsync()
    {
        return await _studentAssignmentRepository.ListAsync();
    }

    public async Task<StudentAssignmentResponse> UpdateAsync(int id, StudentAssignment studentAssignment)
    {

        var existingStudentAssignment = await _studentAssignmentRepository.FindByIdAsync(id);

        if (existingStudentAssignment == null)
            return new StudentAssignmentResponse("StudentAssignment not found.");

        existingStudentAssignment.AssignmentFk = studentAssignment.AssignmentFk;
        existingStudentAssignment.Points = studentAssignment.Points;
        existingStudentAssignment.StudentFkNavigation = studentAssignment.StudentFkNavigation;
        try
        {
            _studentAssignmentRepository.Update(existingStudentAssignment);
            await _unitOfWork.CompleteAsync();

            return new StudentAssignmentResponse(existingStudentAssignment);
        }
        catch (Exception ex)
        {
            return new StudentAssignmentResponse($"An error occurred when updating the category: {ex.Message}");
        }    
    }

    public async Task<StudentAssignmentResponse> FindOneAsync(int id)
    {
        var existingStudentAssignment = await this._studentAssignmentRepository.FindByIdAsync(id);
        return new StudentAssignmentResponse(existingStudentAssignment);    
    }
}