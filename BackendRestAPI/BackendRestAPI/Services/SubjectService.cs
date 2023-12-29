using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Domain.Services.Communication;

namespace BackendRestAPI.Services;

public class SubjectService : ISubjectService
{
    private readonly ISubjectRepository _subjectRepository;

    public SubjectService(ISubjectRepository subjectRepository)
    {
        this._subjectRepository = subjectRepository;
    }

    public async Task<IEnumerable<Subject>> ListAsync()
    {
        return await _subjectRepository.ListAsync();
    }

    
    public async Task<IEnumerable<Subject>> ListByClassIdAsync(int classId)
    {
        var subjects = await _subjectRepository.ListByClassIdAsync(classId);
        return subjects;
    }
}