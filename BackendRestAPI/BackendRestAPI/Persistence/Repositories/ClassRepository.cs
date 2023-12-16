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
        return await _context.Classes.Include(c => c.Students).Include(c => c.Subjects).ToListAsync();
    }

    public async Task<Class> FindByIdAsync(int id)
    {
        return await _context.Classes
            .Include(c => c.Students)
            .Include(c => c.Subjects)
            .FirstOrDefaultAsync(c => c.PkClass == id) ?? throw new InvalidOperationException();
    }
    
}