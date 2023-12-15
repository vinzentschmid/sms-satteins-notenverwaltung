using AutoMapper;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;
using Microsoft.AspNetCore.Mvc;

namespace BackendRestAPI.Controllers;

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
        // if (favor == null)
        //     return BadRequest("Favor not found!");
        var resource = _mapper.Map<Class, ClassResource>(classObject.Class);
        return resource;
    } 

    
}