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
        CreateMap<Subject, SubjectResource>()
            .ForMember(dest => dest.Assignments, opt => opt.MapFrom(src => src.Assignments.ToList()));
        CreateMap<Assignment, AssignmentResource>()
            .ForMember(dest => dest.AssignmentType, opt => opt.MapFrom(src => src.AssignmentType.ToString()))
            .ForMember(dest => dest.Semester, opt => opt.MapFrom(src => src.Semester.ToString()));
        CreateMap<StudentAssignment, StudentAssignmentResource>()
            .ForMember(dest => dest.StudentFkNavigation, opt => opt.MapFrom(src => src.StudentFkNavigation))
            .ForMember(dest => dest.AssignmentFkNavigation, opt => opt.MapFrom(src => src.AssignmentFkNavigation));
    }
}