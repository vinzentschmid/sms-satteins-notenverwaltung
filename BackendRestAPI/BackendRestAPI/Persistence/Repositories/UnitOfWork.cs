using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Persistence.Contexts;

namespace BackendRestAPI.Persistence.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    
    public UnitOfWork(AppDbContext context)
    {
        _context = context;     
    }
    public async Task CompleteAsync()
    {
        await _context.SaveChangesAsync();
    }
}