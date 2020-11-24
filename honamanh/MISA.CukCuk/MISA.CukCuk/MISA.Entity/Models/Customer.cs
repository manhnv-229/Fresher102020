using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Entity.Model
{
    /// <summary>
    /// Khách hàng
    /// CreatedBy: HNANH (23/11/2020)
    /// </summary>
    public class Customer
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
        public Guid CustomerId { get; set; }
        /// <summary>
        /// Mã khách hàng
        /// </summary>
        public string CustomerCode { get; set; }
        /// <summary>
        /// Tên khách hàng
        /// </summary>
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
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Địa chỉ email
        /// </summary>
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
        /// Ngày giờ tạo bản ghi
        /// </summary>
        public DateTime CreatedDate { get; set; }
        /// <summary>
        /// Người tạo bản ghi
        /// </summary>
        public string  CreatedBy { get; set; }
        /// <summary>
        /// Ngày giờ sửa bản ghi
        /// </summary>
        public DateTime ModifiedDate { get; set; }
        /// <summary>
        /// Tên người sửa bản ghi
        /// </summary>
        public string  ModifiedBy { get; set; }
        #endregion
        #region Method
        #endregion

    }
}
