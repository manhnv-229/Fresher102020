using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Common.Models
{
    /// <summary>
    /// Khách hàng
    /// Author: TVHa (23/11/2020)
    /// </summary>
    public class Customer
    {
        #region Constructor
        #endregion Constructor
        #region Property
        /// <summary>
        /// Khoá chính
        /// </summary>
        public Guid CustomerId { get; set; }

        /// <summary>
        /// Mã khách hàng
        /// </summary>
        public string CustomerCode { get; set; }

        /// <summary>
        /// Họ và tên khách hàng
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Ngày tháng năm sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Địa chỉ email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Giới tính (0: Nữ; 1: Nam)
        /// </summary>
        public int Gender { get; set; }

        /// <summary>
        /// Số điện thoại khách hàng
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Mã số thẻ thành viên
        /// </summary>
        public string MemberCardCode { get; set; }

        /// <summary>
        /// Tên công ty làm việc
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// Mã số thuế của công ty đang làm việc
        /// </summary>
        public string CompanyTaxCode { get; set; }

        /// <summary>
        /// Địa chỉ khách hàng
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// Khoá ngoại: nhóm khách hàng
        /// </summary>
        public Guid? CustomerGroupId { get; set; }

        /// <summary>
        /// Ngày tạo
        /// </summary>
        public DateTime CreateDate { get; set; }

        /// <summary>
        /// Người tạo
        /// </summary>
        public string CreateBy { get; set; }

        /// <summary>
        /// Ngày chỉnh sửa gần nhất
        /// </summary>
        public DateTime ModifiedDate { get; set; }

        /// <summary>
        /// Người chỉnh sửa gần nhất
        /// </summary>
        public string ModifiedBy { get; set; }
    }
    #endregion Property
        #region Method
        #endregion Method
}