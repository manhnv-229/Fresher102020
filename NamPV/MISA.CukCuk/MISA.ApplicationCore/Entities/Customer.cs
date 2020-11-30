using MISA.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Khách hàng
    /// </summary>
    /// CreatedBy: NamPV (23/11/2020)
    public class Customer : BaseEntity
    {
        #region Field

        #endregion
        #region Properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        [PrimaryKey]
        public Guid CustomerId { get; set; }
        /// <summary>
        /// mã khách hàng
        /// </summary>
        [DisplayName("Mã khách hàng")]
        [Duplicate]
        [Required]
        [MaxLength(20, "Mã khách hàng không được vượt quá 20 ký tự")]
        public string CustomerCode { get; set; }
        /// <summary>
        /// Họ
        /// </summary>
        [DisplayName("Tên khách hàng")]
        public string FirstName { get; set; }
        /// <summary>
        /// Tên
        /// </summary>
        [DisplayName("Họ và đệm")]
        public string LastName { get; set; }
        /// <summary>
        /// Họ và tên
        /// </summary>
        [DisplayName("Họ và tên đầy đủ")]
        public string FullName { get; set; }
        /// <summary>
        /// Giới tính
        /// </summary>
        [DisplayName("Giới tính")]
        public int? Gender { get; set; }
        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Email
        /// </summary>
        [Duplicate]
        [DisplayName("Email")]
        public string Email { get; set; }
        /// <summary>
        /// Số điệ  thoại
        /// </summary>
        [Duplicate]
        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// Mã hóm khách hàng
        /// </summary>
        public Guid? CustomerGroupId { get; set; }
        /// <summary>
        /// Số tiền nợ
        /// </summary>
        public double? DebitAmount { get; set; }
        /// <summary>
        /// Mã thẻ thành viên
        /// </summary>
        [Duplicate]
        [DisplayName("Mã khách hàng")]
        public string MemberCardCode { get; set; }
        /// <summary>
        /// Tên công ty
        /// </summary>
        public string CompanyName { get; set; }
        /// <summary>
        /// Mã số thuế
        /// </summary>
        public string CompanyTaxCode { get; set; }
        /// <summary>
        /// Ngừng theo dõi
        /// </summary>
        public Boolean? IsStopFollow { get; set; }
        #endregion
        #region Constructor

        #endregion
        #region Method

        #endregion
    }
}
