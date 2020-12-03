using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Khách hàng
    /// </summary>
    /// CreatedBy: THNhat (23/11/2020)
    public class Customer:BaseEntity
    {
        #region Declare
        #endregion

        #region Constructor
        #endregion  

        #region Property
        /// <summary>
        /// khóa chính
        /// </summary>
        [PrimaryKey]
        [DisplayName("Id khách hàng")]
        public Guid CustomerId { get; set; }
        /// <summary>
        ///  Mã khách hàng
        /// </summary>
        [Required]
        [CheckDuplicate]
        [MaxLength(20,"Mã khách hàng không được quá 20 kí tự")]
        [DisplayName("Mã khách hàng")]
        public string CustomerCode { get; set; }

        /// <summary>
        /// Họ và tên
        /// </summary>
        [Required]
        [CheckDuplicate]
        [DisplayName("Họ và tên")]
        public string FullName { get; set; }

        /// <summary>
        /// Mã thẻ thành viên
        /// </summary>
        [DisplayName("Mã thẻ thành viên")]
        public string MemberCardCode { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        [DisplayName("Ngày sinh")]
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Giới tính (0-Nữ; 1-Name; 2-Khác)
        /// </summary>
        [DisplayName("Giới tính")]
        public int? Gender { get; set; }

        /// <summary>
        /// Địa chỉ Email
        /// </summary>
        [DisplayName("Địa chỉ Email")]
        public string Email { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        [DisplayName("Số điện thoại")]
        [CheckDuplicate]
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Tên công ty
        /// </summary>
        [DisplayName("Tên công ty")]
        public string CompanyName { get; set; }

        /// <summary>
        /// Mã số thuế
        /// </summary>
        [DisplayName("Mã số thuế")]
        public string CompanyTaxCode { get; set; }

        /// <summary>
        /// Địa chỉ
        /// </summary>
        [DisplayName("Địa chỉ")]
        public string Address { get; set; }

        /// <summary>
        /// Khóa ngoại bảng CustomerGroup
        /// </summary>
        [DisplayName("Id Nhóm Khách hàng")]
        public Guid? CustomerGroupId { get; set; }
        #endregion
        
        #region Method
        #endregion
    }
}
