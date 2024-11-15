using System.Text.Json;
using System.Text.Json.Serialization;
using AutoMapper;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackendRestAPI.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ClassesController : ControllerBase
{
    private readonly IClassService _classService;
    private readonly IMapper _mapper;
    public ClassesController(IClassService classService, IMapper mapper)
    {
        this._classService = classService;
        this._mapper = mapper;
    }
    
    // GET: api/Classes
    [HttpGet]
    public async Task<IEnumerable<ClassResource>> GetClasses()
    {
        var classes = await _classService.ListAsync();
        var resources = _mapper.Map<IEnumerable<Class>, IEnumerable<ClassResource>>(classes);
        
        return resources;
    }
    
    // GET: api/Classes/1
    [HttpGet("{id}")]
    public async Task<ActionResult<ClassResource>> GetClass(int id)
    {
        var classObject = await _classService.FindOneAsync(id);
        return classObject.Class != null
            ? _mapper.Map<Class, ClassResource>(classObject.Class)
            : BadRequest("Class not found");
    } 

    
}