using SManage.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace SManage.ApplicationCore
{
    public class BaseEntity
    {
        public EntityState EntityState = EntityState.GET;
        // trạng thái entity (hợp lệ hay không)
        public ValidState ValidState = ValidState.Valid;
        // danh sách thông báo lỗi
        public List<string> InvalidError = new List<string>();
        /// <summary>
        /// Ngày tạo, nếu null thì set = Ngày hiện tại
        /// </summary>
        [DisplayName("Ngày tạo")]
        public DateTime? CreatedDate { get; set; }
        /// <summary>
        /// Người tạo
        /// </summary>
        [DisplayName("Người tạo")]
        public Guid? CreatedBy { get; set; }
        /// <summary>
        /// Ngày chỉnh sửa, nếu null thì set = Ngày tạo
        /// </summary>
        [DisplayName("Ngày chỉnh sửa")]
        public DateTime? ModifiedDate { get; set; }
        /// <summary>
        /// Người chỉnh sửa
        /// </summary>
        [DisplayName("Người chỉnh sửa chỉnh sửa")]
        public Guid? ModifiedBy { get; set; }

    }

    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey : Attribute
    {

    }

    [AttributeUsage(AttributeTargets.Property)]
    public class Required : Attribute
    {

    }

    [AttributeUsage(AttributeTargets.Property)]
    public class Unduplicated : Attribute
    {

    }

    [AttributeUsage(AttributeTargets.Property)]
    public class DisplayName : Attribute
    {
        public string name { get; set; }
        public DisplayName(string name)
        {
            this.name = name;
        }
    }

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

    /// <summary>
    /// Bắt buộc phải có trên Hệ thống
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class MustExist : Attribute
    {

    }
    /// <summary>
    /// Không cần check trùng nếu đang ở chế độ cập nhật
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class NotCheckDuplicateWhenEdit : Attribute
    {

    }
}


