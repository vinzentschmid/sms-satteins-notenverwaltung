using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Persistence.Contexts;
using BackendRestAPI.Persistence.Repositories;
using BackendRestAPI.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();



builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql("Host=localhost;Port=5432;Database=postgres;User ID=postgres;Password=password;"));
builder.Services.AddScoped<ITeacherRepository, TeacherRepository>();
builder.Services.AddScoped<ITeacherService, TeacherService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}



app.MapControllers();

app.Run();
// var builder = WebApplication.CreateBuilder(args);
//
// builder.Services.AddControllers();
//
// builder.Services.AddDbContext<PostgresContext>();
// var app = builder.Build();
//
// app.MapControllers();
//
// app.Run();
