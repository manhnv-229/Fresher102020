using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Class
{
    /// <summary>
    /// Khách hàng
    /// </summary>
    /// CreatedBy: tqhuy(30/11/2020)
    public class Customer
    {
        #region property
        /// <summary>
        /// khóa chính 
        /// </summary>
        /// 
        [PrimaryKey]
        public Guid CustomerID { get; set; }
        /// <summary>
        /// mã khách hàng
        /// </summary>
        [CheckDuplicate]
        [Required]
        public string CustomerCode { get; set; }
        /// <summary>
        /// fristName khách hàng
        /// </summary>
        public string FristName { get; set; }
        /// <summary>
        /// Last Name khách hàng
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// full name kasch hàng
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// giới tính: 0-nam , 1-nữ, 2-khác
        /// </summary>
        public int Gender { get; set; }
        /// <summary>
        /// địa chỉ khách hàng
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// mã thành viên khách hàng
        /// </summary>
        public string MemberCardCode { get; set; }
        /// <summary>
        /// ngày sinh khách hàng
        /// </summary>
        public DateTime DateOfBrith { get; set; }
        /// <summary>
        /// email khách hàng
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// điện thoại khách hàng
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// tên công ty khách hàng
        /// </summary>
        public string CompanyName { get; set; }
        /// <summary>
        /// trạng thái hoạt động của khách hàng
        /// </summary>
        public bool IsStopFollow { get; set; }
        /// <summary>
        /// mã số thuế
        /// </summary>
        public string CompanyTaxCode { get; set; }
        /// <summary>
        /// khóa ngoại với bảng nhóm khách hàng
        /// </summary>
        public Guid CustomerGroupID { get; set; }
        /// <summary>
        /// ngày tạo bản ghi
        /// </summary>
        public DateTime CreatedDate { get; set; }
        /// <summary>
        /// người tạo bản nghi
        /// </summary>
        public String CreatedBy { get; set; }
        /// <summary>
        /// ngày chỉnh sửa gần nhất
        /// </summary>
        public DateTime ModifiedDate { get; set; }
        /// <summary>
        /// \người chỉnh sửa bản ghi gần nhất
        /// </summary>
        public String ModifiedBy { get; set; }
        #endregion
    }
}
