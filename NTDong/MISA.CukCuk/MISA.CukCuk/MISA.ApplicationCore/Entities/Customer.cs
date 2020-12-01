using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Entities
{   
/// <summary>
/// Khách hàng
/// createdBy:NTDong(23/11/2020)
/// </summary>
    public class Customer:BaseEntity
    {
        #region Declare
        #endregion
        #region Constructor
        #endregion
        #region Property
        /// <summary>
        /// ID Khách hàng
        /// </summary>
        [PrimaryKey]
        public Guid CustomerId { get; set; }
        /// <summary>
        /// Mã số khách hàng 
        /// </summary>
        [Required]
        [DisplayName("Mã khách hàng")]
        [MaxLength(20 , "Mã khách hàng không vượt quá 20 kí tự")]
        public string CustomerCode { get; set; }
        /// <summary>
        /// Tên khách hàng
        /// </summary>
        [DisplayName("Họ và tên")]
        public string FullName { get; set; }
        /// <summary>
        /// Giới tính 
        /// </summary>
        [DisplayName("Giới tính")]
        public int Gender { get; set; }
        /// <summary>
        /// Địa chỉ khách hàng 
        /// </summary>
        [DisplayName("Địa chỉ khách hàng")]
        public string Address { get; set; }
        /// <summary>
        /// Ngày sinh
        /// </summary>
        [DisplayName("Ngày sinh")]
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Địa chỉ email
        /// </summary>
        [DisplayName("Địa chỉ Email")]
        public string Email { get; set; }
        /// <summary>
        /// Số điện thoại khách hàng 
        /// </summary>
        [CheckDuplicate]
        [Required]
        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }
        /// <summary>
        /// mã nhóm khách hàng 
        /// </summary>
        [DisplayName("Nhóm khách hàng")]
        public Guid? CustomerGroupId { get; set; }
        /// <summary>
        /// Mã thẻ thành viên
        /// </summary>
        [DisplayName("Mã thẻ thành viên")]
        public string MemberCardCode { get; set; }
        /// <summary>
        /// Tên công ty
        /// </summary>
        [DisplayName("Tên công ty")]
        public string CompanyName { get; set; }
        /// <summary>
        /// Mã số thuế
        /// </summary>
        [DisplayName("Mã số thuế công ty")]
        public string CompanyTexCode { get; set; }
        /// <summary>
        /// Người tạo
        /// </summary>
        [DisplayName("Người tạo")]
        public string CreatedBy { get; set; }
        /// <summary>
        /// Ngày Tạo
        /// </summary>
        [DisplayName("Ngày tạo")]
        public DateTime? CreatedDate { get; set; }
        /// <summary>
        /// Người sửa
        /// </summary>
        [DisplayName("Người sửa")]
        public string ModifyBy { get; set; }
        /// <summary>
        /// Ngày sửa
        /// </summary>
        [DisplayName("Ngày sửa")]
        public DateTime? ModifyDate { get; set; }
        #endregion
        #region Method
        #endregion
    }
}
