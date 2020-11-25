using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Models
{
    /// <summary>
    /// class khách hàng
    /// </summary>
    /// createdby: dvquang (24/11/2020)
    public class Customer
    {
        #region property
        /// <summary>
        /// id khách hàng
        /// </summary>
        public Guid CustomerId { get; set; }
        /// <summary>
        /// mã khách hàng
        /// </summary>
        public string CustomerCode { get; set; }
        /// <summary>
        /// Họ và đệm khách hàng
        /// </summary>
        public string FirstName { get; set; }
        /// <summary>
        /// tên khách hàng
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// họ và tên khách hàng
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// giới tính
        /// </summary>
        public int? Gender { get; set; }
        /// <summary>
        /// địa chỉ
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// ngày tháng năm sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// địa chỉ email
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// số điện thoại
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// id nhóm khách hàng
        /// </summary>
        public Guid? CustomerGroupId { get; set; }
        /// <summary>
        /// mã thẻ thành viên
        /// </summary>
        public string MemberCardCode { get; set; }
        /// <summary>
        /// tên công ty
        /// </summary>
        public string CompanyName { get; set; }
        /// <summary>
        /// mã số thuế công ty
        /// </summary>
        public string CompanyTaxCode { get; set; }
        /// <summary>
        /// ngày tạo bản ghi
        /// </summary>
        public DateTime? CreatedDate { get; set; }
        /// <summary>
        /// người tạo
        /// </summary>
        public string CreatedBy { get; set; }
        /// <summary>
        /// ngày thay đổi
        /// </summary>
        public DateTime? ModifiedDate { get; set; }
        /// <summary>
        /// người thay đổi
        /// </summary>
        public string ModifiedBy { get; set; }
        #endregion
    }
}
