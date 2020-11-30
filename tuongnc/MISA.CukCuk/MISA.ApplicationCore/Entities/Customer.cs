using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Khách hàng 
    /// </summary>
    /// CreatedBy: TuongNC (21/11/2020)
    public class Customer : BaseEntity
    {
        #region Property
        /// <summary>
        /// Khóa chính
        /// </summary>
        [PrimaryKey]
        [DisplayName("Khóa chính")]
        public Guid CustomerId { get; set; }
        /// <summary>
        /// Mã khách hàng
        /// </summary>
        [Unique]
        [Required]
        [DisplayName("Mã khách hàng")]
        public string CustomerCode { get; set; }
        /// <summary>
        /// Tên đầy đủ khách hàng
        /// </summary>
        [DisplayName("Tên đầy đủ")]
        public string FullName { get; set; }
        /// <summary>
        /// Mã thành viên khách hàng
        /// </summary>
        [DisplayName("Mã Thành viên")] 
        public string MemberCardCode { get; set; }
        /// <summary>
        /// Ngày sinh của khách hàng
        /// </summary>
        [DisplayName("Ngày sinh")] 
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Giới tính khách hàng
        /// 0-Nữ; 1- Nam; 2- Khác
        /// </summary>
        [DisplayName("Giới tính")] 
        public int? Gender { get; set; }
        /// <summary>
        /// Thư điện tử của khách hàng
        /// </summary>
        [DisplayName("Email")]
        public string Email { get; set; }
        /// <summary>
        /// Số điện thoại của khách hàng
        /// </summary>
        [DisplayName("Số điện thoại")]
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
        /// Khóa ngoại tới bảng CustomerGroup
        /// </summary>
        [DisplayName("Khóa ngoại")]
        public Guid CustomerGroupId { get; set; }
        /// <summary>
        /// Ngày tạo
        /// </summary>
        #endregion
    }
}
