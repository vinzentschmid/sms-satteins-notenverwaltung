using AutoMapper;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;
using Microsoft.AspNetCore.Mvc;

namespace BackendRestAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentsController : ControllerBase
{
    private readonly IStudentService _studentService;
    private readonly IStudentAssignmentService _studentAssignmentService;

    private readonly IMapper _mapper;

    public StudentsController(IStudentService studentService, IMapper mapper, IStudentAssignmentService studentAssignmentService)
    {
        this._studentAssignmentService = studentAssignmentService;

        this._studentService = studentService;
        this._mapper = mapper;
    }
    // GET: api/Students
    [HttpGet]
    public async Task<IEnumerable<StudentResource>> GetStudents()
    {
        var students = await _studentService.ListAsync();
        var resources = _mapper.Map<IEnumerable<Student>, IEnumerable<StudentResource>>(students);
        
        return resources;
    }
    
    [HttpGet("Assignments")]
    public async Task<IEnumerable<StudentAssignmentResource>> GetClasses()
    {
        var studentAssignments = await _studentAssignmentService.ListAsync();
        var resources = _mapper.Map<IEnumerable<StudentAssignment>, IEnumerable<StudentAssignmentResource>>(studentAssignments);
        
        return resources;
    }
    
    [HttpGet("ByClass/{classId}")]
    public async Task<ActionResult<IEnumerable<StudentResource>>> GetStudentsByClass(int classId)
    {
        var students = await _studentService.ListByClassIdAsync(classId);
        var enumerable = students.ToList();
        if (!enumerable.Any())
        {
            return NotFound("Students not found for the class");
        }

        var studentResources = _mapper.Map<IEnumerable<Student>, IEnumerable<StudentResource>>(enumerable);
        return Ok(studentResources);
    }
}