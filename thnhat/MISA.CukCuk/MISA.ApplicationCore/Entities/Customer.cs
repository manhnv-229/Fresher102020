using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.ApplicationCore.Entites
{
    /// <summary>
    /// Khách hàng
    /// </summary>
    /// CreatedBy: THNhat (23/11/2020)
    public class Customer
    {
        #region Declare
        #endregion

        #region Constructor
        #endregion  

        #region Property
        /// <summary>
        /// khóa chính
        /// </summary>
        public Guid CustomerId { get; set; }
        /// <summary>
        ///  Mã khách hàng
        /// </summary>
        public string CustomerCode { get; set; }

        /// <summary>
        /// Họ và tên
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Mã thẻ thành viên
        /// </summary>
        public string MemberCardCode { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Giới tính (0-Nữ; 1-Name; 2-Khác)
        /// </summary>
        public int? Gender { get; set; }

        /// <summary>
        /// Địa chỉ Email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Số điện thoại
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
        /// Khóa ngoại bảng CustomerGroup
        /// </summary>
        public Guid? CustomerGroupId { get; set; }

        /// <summary>
        /// Ngày giờ tạo bản ghi
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Người tạo bản ghi
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// Ngày thực hiện chỉnh sửa gần nhất
        /// </summary>
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Người chỉnh sửa
        /// </summary>
        public string ModifiedBy { get; set; }
        #endregion
        
        #region Method
        #endregion
    }
}
