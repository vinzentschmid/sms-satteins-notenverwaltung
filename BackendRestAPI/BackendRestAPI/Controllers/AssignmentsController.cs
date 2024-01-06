using AutoMapper;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Extensions;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Serialization;

namespace BackendRestAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AssignmentsController : ControllerBase
{
    private readonly IAssignmentService _assignmentService;
    private readonly IStudentAssignmentService _studentAssignmentService;
    private readonly IMapper _mapper;

    public AssignmentsController(IAssignmentService assignmentService, IMapper mapper, IStudentAssignmentService studentAssignmentService)
    {
        _assignmentService = assignmentService;
        _studentAssignmentService = studentAssignmentService;
        _mapper = mapper;
    }
    
    // GET: api/Assignments
    [HttpGet]
    public async Task<IEnumerable<AssignmentResource>> GetAssignments()
    {
        var assignments = await _assignmentService.ListAsync();
        var resources = _mapper.Map<IEnumerable<Assignment>, IEnumerable<AssignmentResource>>(assignments);
        
        return resources;
    }
    
    // GET: api/Assignments/BySubject/5
    [HttpGet("BySubject/{subjectId}")]
    public async Task<ActionResult<IEnumerable<AssignmentResource>>> GetAssignmentsBySubject(int subjectId)
    {
        var assignments = await _assignmentService.ListBySubjectIdAsync(subjectId);
        var enumerable = assignments.ToList();
        if (!enumerable.Any())
        {
            return Ok(new List<Assignment>());
        }

        var assignmentResources = _mapper.Map<IEnumerable<Assignment>, IEnumerable<AssignmentResource>>(enumerable);
        return Ok(assignmentResources);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStudentAssignment(int id, [FromBody] SaveStudentAssignmentResource resource)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState.GetErrorMessages());

        var studentAssignment = _mapper.Map<SaveStudentAssignmentResource, StudentAssignment>(resource);
        var result = await _studentAssignmentService.UpdateAsync(id, studentAssignment);

        if (!result.Success)
            return BadRequest("Update Assignment went wrong");

        var studentAssignmentResource = _mapper.Map<StudentAssignment, StudentAssignmentResource>(result.StudentAssignment);
        return Ok(studentAssignmentResource);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<StudentAssignmentResource>> GetStudentAssignment(int id)
    {
        var studentAssignment = await _studentAssignmentService.FindOneAsync(id);
        return studentAssignment.StudentAssignment != null
            ? _mapper.Map<StudentAssignment, StudentAssignmentResource>(studentAssignment.StudentAssignment)
            : BadRequest("Class not found");
    }

    [HttpPost]
    public async Task<IActionResult> PostAssignment([FromBody] SaveAssignmentResource resource)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState.GetErrorMessages());

        var assignment = _mapper.Map<SaveAssignmentResource, Assignment>(resource);
        var result = await _assignmentService.SaveAsync(assignment);

        if (!result.Success)
            return BadRequest(result.Message);
        var assignmentResource = _mapper.Map<Assignment, AssignmentResource>(result.Assignment);
        return Ok(assignmentResource);
    }
    
    [HttpPost("StudentAssignment")]
    public async Task<IActionResult> PostStudentAssignment([FromBody] SaveStudentAssignmentResource resource)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState.GetErrorMessages());

        var studentAssignment = _mapper.Map<SaveStudentAssignmentResource, StudentAssignment>(resource);
       
        
        var result = await _studentAssignmentService.SaveAsync(studentAssignment);

        if (!result.Success)
            return BadRequest(result.Message);
        
        var assignmentResource = _mapper.Map<StudentAssignment, StudentAssignmentResource>(result.StudentAssignment);
        
        return Ok(assignmentResource);
    }
}