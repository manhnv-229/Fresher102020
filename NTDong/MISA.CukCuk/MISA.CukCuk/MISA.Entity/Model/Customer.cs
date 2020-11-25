using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Infrastructure.Model
{   
/// <summary>
/// Khách hàng
/// createdBy:NTDong(23/11/2020)
/// </summary>
    public class Customer
    {
        #region Declare
        #endregion
        #region Constructor
        #endregion
        #region Property
        /// <summary>
        /// ID Khách hàng
        /// </summary>
        public Guid CustomerId { get; set; }
        /// <summary>
        /// Mã số khách hàng 
        /// </summary>
        public string CustomerCode { get; set; }
        /// <summary>
        /// Tên khách hàng
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// Giới tính 
        /// </summary>
        public int Gender { get; set; }
        /// <summary>
        /// Địa chỉ khách hàng 
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Địa chỉ email
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Số điện thoại khách hàng 
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// mã nhóm khách hàng 
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
        /// Mã số thuế
        /// </summary>
        public string CompanyTexCode { get; set; }
        /// <summary>
        /// Người tạo
        /// </summary>
        public string CreatedBy { get; set; }
        /// <summary>
        /// Ngày Tạo
        /// </summary>
        public DateTime? CreatedDate { get; set; }
        /// <summary>
        /// Người sửa
        /// </summary>
        public string ModifyBy { get; set; }
        /// <summary>
        /// Ngày sửa
        /// </summary>
        public DateTime? ModifyDate { get; set; }
        #endregion
        #region Method
        #endregion
    }
}
