using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    [AttributeUsage(AttributeTargets.Property)]
    public class Require: Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class CheckExist : Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey : Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class MaxLength : Attribute
    {
        public int Length { get; set; }
        public string ErrorMessage { get; set; }
        public MaxLength(int length, string errorMessage = "")
        {
            Length = length;
            ErrorMessage = errorMessage;
        }
    }
    [AttributeUsage(AttributeTargets.Property)]
    public class DisplayName : Attribute
    {
        public string Name { get; set; }
        public DisplayName(string name)
        {
            Name = name;
        }
    }
    public class BaseEntity
    {
        /// <summary>
        /// Trạng thái của phương thức
        /// </summary>
        public EntityState entityState { get; set; } = EntityState.Add;
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}
