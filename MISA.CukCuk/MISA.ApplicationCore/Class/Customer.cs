using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Class
{
    /// <summary>
    /// Khách hàng
    /// </summary>
    /// CreatedBy: tqhuy(30/11/2020)
    public class Customer: BaseEntity
    {
        #region property
        /// <summary>
        /// khóa chính 
        /// </summary>
        /// 
        [PrimaryKey]
        public Guid CustomerID { get; set; }
        /// <summary>
        /// mã khách hàng
        /// </summary>
        [CheckDuplicate]
        [Required]
        [DisplayName("Mã khách hàng")]
        public string CustomerCode { get; set; }
        /// <summary>
        /// fristName khách hàng
        /// </summary>
        public string FristName { get; set; }
        /// <summary>
        /// Last Name khách hàng
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// full name kasch hàng
        /// </summary>
        /// 
        [Required]
        [DisplayName("Họ và Tên")]
        public string FullName { get; set; }
        /// <summary>
        /// giới tính: 0-nam , 1-nữ, 2-khác
        /// </summary>
        public int Gender { get; set; }
        /// <summary>
        /// tên giới tính
        /// </summary>
        public string GenderName { get; set; }
        /// <summary>
        /// địa chỉ khách hàng
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// mã thành viên khách hàng
        /// </summary>
        public string MemberCardCode { get; set; }
        /// <summary>
        /// ngày sinh khách hàng
        /// </summary>
        public DateTime DateOfBrith { get; set; }
        /// <summary>
        /// email khách hàng
        /// </summary>
        /// 
        [Required]
        [Email]
        [CheckDuplicate]
        [DisplayName("Email")]
        public string Email { get; set; }
        /// <summary>
        /// điện thoại khách hàng
        /// </summary>
        /// 
        [Required]
        [PhoneNumber]
        [CheckDuplicate]
        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }
        /// <summary>
        /// tên công ty khách hàng
        /// </summary>
        public string CompanyName { get; set; }
        /// <summary>
        /// trạng thái hoạt động của khách hàng
        /// </summary>
        public bool IsStopFollow { get; set; }
        /// <summary>
        /// mã số thuế
        /// </summary>
        public string CompanyTaxCode { get; set; }
        /// <summary>
        /// khóa ngoại với bảng nhóm khách hàng
        /// </summary>
        public Guid CustomerGroupID { get; set; }
        #endregion
    }
}
