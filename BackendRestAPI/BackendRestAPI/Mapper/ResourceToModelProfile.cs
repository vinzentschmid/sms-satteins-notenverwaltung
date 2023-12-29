using AutoMapper;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;

namespace BackendRestAPI.Mapper;

public class ResourceToModelProfile : Profile
{
    public ResourceToModelProfile()
    {
        CreateMap<SaveTeacherResource, Teacher>();
        CreateMap<SaveStudentAssignmentResource, StudentAssignment>();

    }
}