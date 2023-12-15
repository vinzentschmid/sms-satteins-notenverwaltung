using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendRestAPI.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BackendRestAPI.Models;
using BackendRestAPI.Persistence;
using BackendRestAPI.Services;

namespace BackendRestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : Controller
    {
        private readonly ITeacherService _teacherService;
        public TeachersController(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }
    
        // GET: api/Teachers
        [HttpGet]
        public async Task<IEnumerable<Teacher>> GetTeachers()
        {
            var teachers = await _teacherService.ListAsync();
            return teachers;
        }
        


    }
}
