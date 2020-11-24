using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Models
{
    /// <summary>
    /// Khách hàng
    /// CreatedBy: LTHAI(23/11/2020)
    /// </summary>
    public class Customer
    {
        #region Declare
        #endregion

        #region Constructor
        #endregion

        #region Property
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid CustomerId { get; set; }
        /// <summary>
        /// Mã khách hàng
        /// </summary>
        public string CustomerCode { get; set; }
        /// <summary>
        /// Họ
        /// </summary>
        public string FirstName { get; set; }
        /// <summary>
        /// Tên
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// Họ và tên
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// Giới tính
        /// </summary>
        public int? Gender { get; set; }
        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Hòm thư của khách hàng
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Mã nhóm khách hàng
        /// </summary>
        public Guid? CustomerGroupId { get; set; }
        /// <summary>
        /// Mã thẻ thành viên
        /// </summary>
        public string MemberCardCode { get; set; }
        /// <summary>
        /// Tên công ty
        /// </summary>
        public string CompanyName { get; set; }
        /// <summary>
        /// Mã số thuế của công ty
        /// </summary>
        public string CompanyTaxCode { get; set; }
        /// <summary>
        /// Số tiền nợ
        /// </summary>
        public double? DebitAmount { get; set; }
        /// <summary>
        /// Dừng theo dõi
        /// </summary>
        public bool? IsStopFollow { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }   
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        #endregion

        #region Method
        #endregion

    }
}
