using MISA.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    [AttributeUsage(AttributeTargets.Property)]
    public class Required: Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class CheckDuplicate : Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey: Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class MaxLength:Attribute
    {
        public int Value { get; set; }
        public string ErrorMsg { get; set; }
        public MaxLength(int maxLength, string msg = null)
        {
            this.Value = maxLength;
            this.ErrorMsg = msg;
        }
    }
    [AttributeUsage(AttributeTargets.Property)]
    public class DisplayName:Attribute
    {
        public string  Name { get; set; }
        public DisplayName(string name= null)
        {
            this.Name = name;
        }
    }
    public class BaseEntity
    {
        public EntityState EntityState { get; set; } = EntityState.AddNew;
        /// <summary>
        /// Ngày giờ tạo bản ghi
        /// </summary>
        public DateTime? CreatedDate { get; set; }
        /// <summary>
        /// Người tạo bản ghi
        /// </summary>
        public string CreatedBy { get; set; }
        /// <summary>
        /// Ngày giờ sửa bản ghi
        /// </summary>
        public DateTime?  ModifiedDate { get; set; }
        /// <summary>
        /// Tên người sửa bản ghi
        /// </summary>
        public string ModifiedBy { get; set; }
    }
}
