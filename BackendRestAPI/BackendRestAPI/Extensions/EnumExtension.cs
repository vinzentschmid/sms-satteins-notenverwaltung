using System.ComponentModel;
using System.Reflection;
using AutoMapper;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Resources;

namespace BackendRestAPI.Extensions;

public class EnumExtension<TEnum> : IValueConverter<string, TEnum> where TEnum : struct
{
    public TEnum Convert(string sourceMember, ResolutionContext context)
    {
        if (string.IsNullOrEmpty(sourceMember))
        {
            throw new ArgumentException("Cannot convert null or empty string to enum.");
        }

        if (Enum.TryParse<TEnum>(sourceMember, out var enumValue))
        {
            return enumValue;
        }

        throw new ArgumentException($"Invalid value for enum {typeof(TEnum).Name}: {sourceMember}");
    }
}
