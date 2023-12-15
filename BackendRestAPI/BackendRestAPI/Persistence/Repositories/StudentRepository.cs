using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Models;
using BackendRestAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BackendRestAPI.Persistence.Repositories;

public class StudentRepository : BaseRepository, IStudentRepository
{
    public StudentRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Student>> ListAsync()
    {
        return await _context.Students.ToListAsync();
    }
}