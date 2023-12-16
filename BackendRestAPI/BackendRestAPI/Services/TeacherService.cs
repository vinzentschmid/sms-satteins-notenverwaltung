using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Domain.Services.Communication;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;

namespace BackendRestAPI.Services;

public class TeacherService : ITeacherService
{
    private readonly ITeacherRepository _teacherRepository;
    private readonly IUnitOfWork _unitOfWork;

    public TeacherService(ITeacherRepository teacherRepository, IUnitOfWork unitOfWork)
    {
        this._teacherRepository = teacherRepository;
        this._unitOfWork = unitOfWork;
    }
    public async Task<IEnumerable<Teacher>> ListAsync()
    {
        return await _teacherRepository.ListAsync();
    }

    public async Task<TeacherResponse> FindOneAsync(int id)
    {
        var existingClass = await this._teacherRepository.FindByIdAsync(id);
        return new TeacherResponse(existingClass);
    }

    public async Task<TeacherResponse> UpdateAsync(int id, Teacher teacher)
    {
        var existingTeacher = await _teacherRepository.FindByIdAsync(id);

        if (existingTeacher == null)
            return new TeacherResponse("Category not found.");

        existingTeacher.Name = teacher.Name;
        existingTeacher.Email = teacher.Email;
        existingTeacher.FirstTitle = teacher.FirstTitle;
        existingTeacher.LastTitle = teacher.LastTitle;
        existingTeacher.Password = teacher.Password;
        
        try
        {
            _teacherRepository.Update(existingTeacher);
            await _unitOfWork.CompleteAsync();

            return new TeacherResponse(existingTeacher);
        }
        catch (Exception ex)
        {
            // Do some logging stuff
            return new TeacherResponse($"An error occurred when updating the category: {ex.Message}");
        }
        
    }
}