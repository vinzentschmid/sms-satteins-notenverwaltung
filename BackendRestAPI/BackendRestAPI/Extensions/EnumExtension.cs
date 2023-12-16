using System.ComponentModel;
using System.Reflection;
using BackendRestAPI.Domain.Models;

namespace BackendRestAPI.Extensions;

public static class EnumExtension
{
    public static string ToDescriptionString<TEnum>(this TEnum @enum)
    {
        FieldInfo info = @enum.GetType().GetField(@enum.ToString());
        var attributes = (DescriptionAttribute[])info.GetCustomAttributes(typeof(DescriptionAttribute), false);

        return attributes?[0].Description ?? @enum.ToString();
    }
}