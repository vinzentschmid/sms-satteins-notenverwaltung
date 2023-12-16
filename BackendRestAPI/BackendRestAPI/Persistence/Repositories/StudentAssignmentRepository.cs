using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Models;
using BackendRestAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BackendRestAPI.Persistence.Repositories;

public class StudentAssignmentRepository : BaseRepository, IStudentAssignmentRepository
{
    public StudentAssignmentRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<StudentAssignment>> ListAsync()
    {
        return await _context.StudentsAssignments
            .Include(c => c.StudentFkNavigation)
            .Include(c => c.AssignmentFkNavigation).ToListAsync();
    }
}