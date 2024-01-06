using AutoMapper;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Extensions;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;

namespace BackendRestAPI.Mapper;

public class ResourceToModelProfile : Profile
{
    public ResourceToModelProfile()
    {
        CreateMap<SaveTeacherResource, Teacher>();
        CreateMap<SaveStudentAssignmentResource, StudentAssignment>();
        CreateMap<SaveAssignmentResource, Assignment>()
            .ForMember(dest => dest.AssignmentType, opt => opt.MapFrom(src => src.AssignmentType.ToString()))
            .ForMember(dest => dest.Semester, opt => opt.MapFrom(src => src.Semester.ToString()));
    }
}