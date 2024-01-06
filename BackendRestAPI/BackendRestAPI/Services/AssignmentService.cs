using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Domain.Services.Communication;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;

namespace BackendRestAPI.Services;

public class AssignmentService : IAssignmentService
{
    private readonly IAssignmentRepository _assignmentRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IStudentRepository _studentRepository;
    private readonly IStudentAssignmentRepository _studentAssignmentRepository;


    public AssignmentService(IAssignmentRepository assignmentRepository, IUnitOfWork unitOfWork, IStudentRepository studentRepository, IStudentAssignmentRepository studentAssignmentRepository)
    {
        this._assignmentRepository = assignmentRepository;
        this._unitOfWork = unitOfWork;
        this._studentRepository = studentRepository;
        this._studentAssignmentRepository = studentAssignmentRepository;
    }

    public async Task<IEnumerable<Assignment>> ListAsync()
    {
        return await _assignmentRepository.ListAsync();
    }
    
    public async Task<IEnumerable<Assignment>> ListBySubjectIdAsync(int subjectId)
    {
        return await _assignmentRepository.ListBySubjectIdAsync(subjectId);
    }

    public async Task<AssignmentResponse> SaveAsync(Assignment assignment)
    {
        try
        {
            
            assignment.AssignmentPk = await GenerateUniquePrimaryKey();

            await _assignmentRepository.AddAsync(assignment);
            await _unitOfWork.CompleteAsync();

            var students = await _studentRepository.ListAsync();

            foreach (var student in students)
            {
                var studentAssignment = new StudentAssignment
                {
                    StudentAssignmentPk = await GenerateUniquePrimaryKeyStudentAssignment(),
                    StudentFk = student.PkStudent,
                    AssignmentFk = assignment.AssignmentPk,
                    Points = 0
                };

                await _studentAssignmentRepository.AddAsync(studentAssignment);
                
                await _unitOfWork.CompleteAsync();

            }
            return new AssignmentResponse(assignment);
        }
        catch (Exception ex)
        {
            return new AssignmentResponse($"An error occurred when saving the assignment: {ex.Message}");
        }
    }
    
    private async Task<int> GenerateUniquePrimaryKey()
    {
        var allAssignments = await _assignmentRepository.ListAsync();
        var assignments = allAssignments.ToList();
        if (!assignments.Any())
        {
            return 1; 
        }

        var maxPk = assignments.Max(sa => sa.AssignmentPk);
        return maxPk + 1;
    }
    
    private async Task<int> GenerateUniquePrimaryKeyStudentAssignment()
    {
        var allStudentAssignments = await _studentAssignmentRepository.ListAsync();

        var studentAssignments = allStudentAssignments.ToList();
        if (!studentAssignments.Any())
        {
            return 1;
        }

        var maxPk = studentAssignments.Max(sa => sa.StudentAssignmentPk);
        return maxPk + 1;
    }
}