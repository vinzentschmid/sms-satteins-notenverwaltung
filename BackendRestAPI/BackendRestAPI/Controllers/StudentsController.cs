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
    private readonly IMapper _mapper;

    public StudentsController(IStudentService studentService, IMapper mapper)
    {
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
}