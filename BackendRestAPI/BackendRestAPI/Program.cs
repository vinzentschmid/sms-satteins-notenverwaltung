using BackendRestAPI.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<PostgresContext>();
var app = builder.Build();

app.MapControllers();

app.Run();
