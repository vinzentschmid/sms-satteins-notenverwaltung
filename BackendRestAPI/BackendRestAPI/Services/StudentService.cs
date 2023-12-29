using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Models;

namespace BackendRestAPI.Services;

public class StudentService : IStudentService
{
    private readonly IStudentRepository _studentRepository;

    public StudentService(IStudentRepository studentRepository)
    {
        this._studentRepository = studentRepository;
    }
    
    public async Task<IEnumerable<Student>> ListAsync()
    {
        return await _studentRepository.ListAsync();
    }
    
    public async Task<IEnumerable<Student>> ListByClassIdAsync(int classId)
    {
        var students = await _studentRepository.ListByClassIdAsync(classId);
        return students;
    }
}