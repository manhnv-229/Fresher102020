using MISA.ApplicationCore.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Class
{
    [AttributeUsage(AttributeTargets.Property)]
    public class Required: Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class CheckDuplicate: Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey: Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class PhoneNumber : Attribute
    {

    }

    [AttributeUsage(AttributeTargets.Property)]
    public class Email : Attribute
    {

    }
    public class DisplayName : Attribute
    {
        public string Name { get; set; }
        public DisplayName(string name = null)
        {
            this.Name = name;
        }
    }
    /// <summary>
    /// class base entity
    /// </summary>
    /// createdBy: tqhuy(30/11/2020)
    public class BaseEntity
    {
        /// <summary>
        /// trạng thái : thêm, sửa, xóa
        /// </summary>
        public EntityState State { get; set; }
        /// <summary>
        /// ngày tạp bản ghi
        /// </summary>
        public DateTime? CreatedDate { get; set; }
        /// <summary>
        /// người tạo bản ghi
        /// </summary>
        public String CreatedBy { get; set; }
        /// <summary>
        /// ngày chỉnh sửa gần nhất
        /// </summary>
        public DateTime? ModifiedDate { get; set; }
        /// <summary>
        /// người chỉnh sửa gần nhất
        /// </summary>
        public String ModifiedBy { get; set; }
    }
}
