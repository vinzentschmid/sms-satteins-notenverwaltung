using AutoMapper;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;
using Microsoft.AspNetCore.Mvc;

namespace BackendRestAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentsAssignmentsController : ControllerBase
{
    private readonly IStudentAssignmentService _studentAssignmentService;
    private readonly IMapper _mapper;
    public StudentsAssignmentsController(IStudentAssignmentService studentAssignmentService, IMapper mapper)
    {
        this._studentAssignmentService = studentAssignmentService;
        this._mapper = mapper;
    }
    
    // GET: api/StudentsAssignments
    [HttpGet]
    public async Task<IEnumerable<StudentAssignmentResource>> GetClasses()
    {
        var studentAssignments = await _studentAssignmentService.ListAsync();
        var resources = _mapper.Map<IEnumerable<StudentAssignment>, IEnumerable<StudentAssignmentResource>>(studentAssignments);
        
        return resources;
    }
}