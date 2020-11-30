using MISA.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities.Base
{
    [AttributeUsage(AttributeTargets.Property)]
    public class Required : Attribute
    {

    }

    [AttributeUsage(AttributeTargets.Property)]
    public class Duplicate : Attribute
    {

    }

    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey : Attribute
    {

    }

    //public class DisplayNameAttribute : Attribute
    //{

    //}

    [AttributeUsage(AttributeTargets.Property)]
    public class MaxLength : Attribute
    {
        public int Length { get; set; }
        public string MsgErr { get; set; }
        public MaxLength(int length, string msgErr)
            => (Length, MsgErr) = (length, msgErr);
    }
    public class BaseEntity
    {
        /// <summary>
        /// Trạng thái thêm, sửa, xoá của đối tượng
        /// </summary>
        public EntityState EntityState { get; set; }
        /// <summary>
        /// Ngày tạo bản ghi
        /// </summary>
        public DateTime CreatedDate { get; set; }
        /// <summary>
        /// NGười tạo bản ghi
        /// </summary>
        public string CreatedBy { get; set; }
        /// <summary>
        /// Ngày chỉnh sửa bản ghi lần cuối
        /// </summary>
        public DateTime ModifiedDate { get; set; }
        /// <summary>
        /// Người chỉnh sửa bản ghi lần cuối
        /// </summary>
        public string ModifiedBy { get; set; }

    }
}
