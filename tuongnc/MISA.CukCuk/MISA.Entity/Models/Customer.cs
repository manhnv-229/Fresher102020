using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Models
{
    /// <summary>
    /// Khách hàng 
    /// </summary>
    /// CreatedBy: TuongNC (21/11/2020)
    public class Customer
    {
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
        /// Tên đầy đủ khách hàng
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// Mã thành viên khách hàng
        /// </summary>
        public string MemberCardCode { get; set; }
        /// <summary>
        /// Ngày sinh của khách hàng
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Giới tính khách hàng
        /// 0-Nữ; 1- Nam; 2- Khác
        /// </summary>
        public int? Gender { get; set; }
        /// <summary>
        /// Thư điện tử của khách hàng
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Số điện thoại của khách hàng
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Tên công ty
        /// </summary>
        public string CompanyName { get; set; }
        /// <summary>
        /// Mã số thuế
        /// </summary>
        public string CompanyTaxCode { get; set; }
        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// Khóa ngoại tới bảng CustomerGroup
        /// </summary>
        public Guid CustomerGroupId { get; set; }
        /// <summary>
        /// Ngày tạo
        /// </summary>
        public DateTime? CreatedDate { get; set; }
        /// <summary>
        /// Người tạo
        /// </summary>
        public string CreatedBy { get; set; }
        /// <summary>
        /// Ngày xửa
        /// </summary>
        public DateTime? ModifiedDate { get; set; }
        /// <summary>
        /// Người xửa
        /// </summary>
        public string ModifiedBy { get; set; }
        #endregion
    }
}
