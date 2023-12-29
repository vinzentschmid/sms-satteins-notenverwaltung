using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BackendRestAPI.Persistence.Repositories;

public class SubjectRepository : BaseRepository, ISubjectRepository
{
    public SubjectRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Subject>> ListAsync()
    {
        return await _context.Subjects.Include(c => c.Assignments).ToListAsync();
    }

    public async Task<IEnumerable<Subject>> ListByClassIdAsync(int classId)
    {
        return await _context.Subjects
            .Where(s => s.ClassFk == classId)
            .ToListAsync();
    }

}