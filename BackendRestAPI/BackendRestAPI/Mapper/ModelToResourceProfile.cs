using AutoMapper;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;

namespace BackendRestAPI.Mapper;

public class ModelToResourceProfile : Profile
{
    public ModelToResourceProfile()
    {
        CreateMap<Teacher, TeacherResource>();
        CreateMap<Student, StudentResource>();
        CreateMap<Class, ClassResource>().ForMember(dest => dest.Students, opt => opt.MapFrom(src => src.Students.ToList()));
    }
}