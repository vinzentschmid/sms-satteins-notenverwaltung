using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Models;
using BackendRestAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BackendRestAPI.Persistence.Repositories;

public class TeacherRepository : BaseRepository, ITeacherRepository
{
    public TeacherRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Teacher>> ListAsync()
    {
        return await _context.Teachers.ToListAsync();
    }

    public async Task<Teacher> FindByIdAsync(int id)
    {
        return await _context.Teachers.FindAsync(id);
    }
}