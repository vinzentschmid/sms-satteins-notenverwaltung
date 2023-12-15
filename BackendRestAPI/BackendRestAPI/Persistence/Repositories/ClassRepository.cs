using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Models;
using BackendRestAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BackendRestAPI.Persistence.Repositories;

public class ClassRepository : BaseRepository, IClassRepository
{
    public ClassRepository(AppDbContext context) : base(context)
    {
    }
    
    public async Task<IEnumerable<Class>> ListAsync()
    {
        return await _context.Classes.ToListAsync();
    }

    public async Task<Class> FindByIdAsync(int id)
    {
        return await _context.Classes.FindAsync(id);
    }

    public async Task<IEnumerable<Student>> GetStudentsByClassId(int classId)
    {
        return await _context.Students
            .Where(student => student.FkClass == classId)
            .ToListAsync();
    }
}