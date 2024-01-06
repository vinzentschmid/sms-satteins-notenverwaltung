using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Models;
using BackendRestAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BackendRestAPI.Persistence.Repositories;

public class AssignmentRepository : BaseRepository, IAssignmentRepository
{
    public AssignmentRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Assignment>> ListAsync()
    {
        return await _context.Assignments.ToListAsync();
        
    }
    
    
    public async Task<IEnumerable<Assignment>> ListBySubjectIdAsync(int subjectId)
    {
        return await _context.Assignments
            .Where(a => a.SubjectFk == subjectId)
            .ToListAsync();
    }

    public async Task AddAsync(Assignment assignment)
    {
        await _context.Assignments.AddAsync(assignment);
    }
}