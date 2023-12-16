using AutoMapper;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Extensions;
using Microsoft.AspNetCore.Mvc;
using BackendRestAPI.Resources;
using BackendRestAPI.Services;

namespace BackendRestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private readonly ITeacherService _teacherService;
        private readonly IMapper _mapper;
        public TeachersController(ITeacherService teacherService, IMapper mapper)
        {
            _teacherService = teacherService;
            _mapper = mapper;
        }
    
        // GET: api/Teachers
        [HttpGet]
        public async Task<IEnumerable<TeacherResource>> GetTeachers()
        {
            var teachers = await _teacherService.ListAsync();
            var resources = _mapper.Map<IEnumerable<Teacher>, IEnumerable<TeacherResource>>(teachers);
            return resources;
        }
        
        // GET: api/Teachers/1
        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherResource>> GetTeacher(int id)
        {
            var teacher = await _teacherService.FindOneAsync(id);
            return teacher.Teacher != null
                ? _mapper.Map<Teacher, TeacherResource>(teacher.Teacher)
                : BadRequest("Class not found");
        } 
        
        // PUT: api/Teacher/1
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveTeacherResource resource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.GetErrorMessages());

            var teacher = _mapper.Map<SaveTeacherResource, Teacher>(resource);
            var result = await _teacherService.UpdateAsync(id, teacher);

            if (!result.Success)
                return BadRequest("Update Teacher went wrong");

            var categoryResource = _mapper.Map<Teacher, TeacherResource>(result.Teacher);
            return Ok(categoryResource);
        }
    }
}
