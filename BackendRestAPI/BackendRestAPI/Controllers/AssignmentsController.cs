using AutoMapper;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;
using Microsoft.AspNetCore.Mvc;

namespace BackendRestAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AssignmentsController : ControllerBase
{
    private readonly IAssignmentService _assignmentService;
    private readonly IMapper _mapper;

    public AssignmentsController(IAssignmentService assignmentService, IMapper mapper)
    {
        _assignmentService = assignmentService;
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
}