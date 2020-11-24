using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Entities
{
    /// <summary>
    /// Khách hàng
    /// </summary>
    /// CreatedBy: NamPV (23/11/2020)
    public class Customer
    {
        #region Field

        #endregion
        #region Properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid CustomerId { get; set; }
        /// <summary>
        /// mã khách hàng
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
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Số điệ  thoại
        /// </summary>
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
        #endregion
        #region Constructor

        #endregion
        #region Method

        #endregion
    }
}
