using AutoMapper;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Extensions;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;

namespace BackendRestAPI.Mapper;

public class ModelToResourceProfile : Profile
{
    public ModelToResourceProfile()
    {
        CreateMap<Teacher, TeacherResource>();
        CreateMap<Student, StudentResource>();
        CreateMap<Class, ClassResource>()
            .ForMember(dest => dest.Students, opt => opt.MapFrom(src => src.Students.ToList()))
            .ForMember(dest => dest.Subjects, opt => opt.MapFrom(src => src.Subjects.ToList()));
        CreateMap<Subject, SubjectResource>();
        CreateMap<Assignment, AssignmentResource>()
            .ForMember(dest => dest.AssignmentType, opt => opt.MapFrom(src => src.AssignmentType.ToString()));
    }
}