using AutoMapper;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Domain.Services.Communication;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackendRestAPI.Controllers;

[Authorize]
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
    [HttpGet("ByClass/{classId}")]
    public async Task<ActionResult<IEnumerable<SubjectResource>>> GetSubjectsByClass(int classId)
    {
        var subjects = await _subjectService.ListByClassIdAsync(classId);
        var enumerable = subjects.ToList();
        if (!enumerable.Any())
        {
            return NotFound("Subjects not found for the class");
        }

        var subjectResources = _mapper.Map<IEnumerable<Subject>, IEnumerable<SubjectResource>>(enumerable);
        return Ok(subjectResources);
    }
    
}