namespace BackendRestAPI.Domain.Repositories;

public interface IUnitOfWork
{
    Task CompleteAsync();
}