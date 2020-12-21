
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA_Dictionary_GoodsService.ApplicationCore
{
    /// <summary>
    /// 
    /// </summary>
    /// CreatedBy dtnga (16/12/2020)
    public class BaseEntity
    {
        /// <summary>
        /// Trạng thái
        /// </summary>
        public EntityState EntityState = EntityState.GET;
        /// <summary>
        /// Ngày tạo
        /// </summary>
        [DisplayName("Ngày tạo")]
        public DateTime? CreatedDate { get; set; }
        /// <summary>
        /// Tạo bởi
        /// </summary>
        [DisplayName("Người tạo")]
        public string CreatedBy { get; set; }
        /// <summary>
        /// Ngày chỉnh sửa
        /// </summary>
        [DisplayName("Ngày chỉnh sửa")]
        public DateTime? ModifiedDate { get; set; }
        /// <summary>
        /// Chỉnh sửa bởi
        /// </summary>
        [DisplayName("Người chỉnh sửa")]
        public string ModifiedBy { get; set; }

    }

    /// <summary>
    /// Khóa chính
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey : Attribute
    {

    }

    /// <summary>
    /// Bắt buộc nhập
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class Required : Attribute
    {

    }

    /// <summary>
    /// Không trùng lặp
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class Unduplicated : Attribute
    {

    }

    /// <summary>
    /// Tên hiển thị
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class DisplayName : Attribute
    {
        public string name { get; set; }
        public DisplayName(string name)
        {
            this.name = name;
        }
    }

    /// <summary>
    /// Độ dài lớn nhất
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class MaxLength : Attribute
    {
        public int maxLength { get; set; }
        public string errorMsg { get; set; }

        public MaxLength(int maxLength, string errorMsg)
        {
            this.maxLength = maxLength;
            this.errorMsg = errorMsg;
        }
    }

}


