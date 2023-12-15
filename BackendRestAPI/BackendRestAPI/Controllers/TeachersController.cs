using AutoMapper;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Services;
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
        
    }
}
