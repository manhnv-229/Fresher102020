using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Khách hàng
    /// CreatedBy: HNANH (23/11/2020)
    /// </summary>
    public class Customer:BaseEntity
    {
        #region Declare
        #endregion
        #region Constructor
        public Customer()
        {

        }
        #endregion
        #region "Property"
        /// <summary>
        ///Khóa chính
        /// </summary>
        /// 
        [PrimaryKey]
        public Guid CustomerId { get; set; }
        /// <summary>
        /// Mã khách hàng
        /// </summary>
        /// 
        [CheckDuplicate]
        
        [DisplayName("Mã khách hàng")]
        [MaxLength(20, "Mã khách hàng không được vượt quá 20 ký tự")]
        public string CustomerCode { get; set; }
        /// <summaryvl>
        /// Tên khách hàng
        /// </summary>
        /// </summary>
        /// 
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string  FullName { get; set; }
        /// <summary>
        /// Mã thẻ thành viên
        /// </summary>
        public string MemberCardCode { get; set; }
        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Giới tính(0:nam, 1:nữ, 2: khác)
        /// </summary>
        public int? Gender { get; set; }
        /// <summary>
        /// Tên công ty
        /// </summary>
        public string  CompanyName { get; set; }
        /// <summary>
        /// Mã số thuế của công ty
        /// </summary>
        public string  CompanyTaxCode { get; set; }
        /// <summary>
        /// Số điện thoại
        /// </summary>
        /// 
        [Required]
        [CheckDuplicate]
        [DisplayName("Số điện thoại khách hàng")]
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Địa chỉ email
        /// </summary>
        /// 
        [DisplayName("Email khách hàng")]
        public string  Email { get; set; }
        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string  Address { get; set; }
        /// <summary>
        /// Nhóm khách hàng
        /// </summary>
        public Guid? CustomerGroupId { get; set; }
        /// <summary>
        /// Số tiền nợ
        /// </summary>
        public double? DebitAmount { get; set; }
        /// <summary>
        /// Dừng theo dõi
        /// </summary>
        public bool? IsStopFollow { get; set; }
        #endregion
        #region Method
        #endregion

    }
}
