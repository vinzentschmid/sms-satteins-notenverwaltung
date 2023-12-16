using AutoMapper;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;
using Microsoft.AspNetCore.Mvc;

namespace BackendRestAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SubjectsController : ControllerBase
{
    private readonly ISubjectService _subjectService;
    private readonly IMapper _mapper;

    public SubjectsController(ISubjectService subjectService, IMapper mapper)
    {
        this._subjectService = subjectService;
        this._mapper = mapper;
    }
    // GET: api/Subjects
    [HttpGet]
    public async Task<IEnumerable<SubjectResource>> GetSubjects()
    {
        var subjects = await _subjectService.ListAsync();
        var resources = _mapper.Map<IEnumerable<Subject>, IEnumerable<SubjectResource>>(subjects);
        
        return resources;
    }
}