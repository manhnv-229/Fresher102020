using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Class
{
    /// <summary>
    /// nhân viên
    /// createdBy: tqhuy(30/11/2020)
    /// </summary>
    public class Employee: BaseEntity
    {
        /// <summary>
        /// khóa chính
        /// </summary>
        public Guid EmployeeID { get; set; }
        /// <summary>
        /// mã nhân viên
        /// </summary>
        /// 
        [Required]
        [CheckDuplicate]
        [DisplayName("Mã nhân viên")]
        public string EmployeeCode { get; set; }
        /// <summary>
        /// họ và tên đệm
        /// </summary>
        public string FirstName { get; set; }
        /// <summary>
        /// tên
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// tên đầy đủ
        /// </summary>
        /// 
        [Required]
        [DisplayName("Họ và Tên")]
        public String FullName { get; set; }
        /// <summary>
        /// giới tính: 0-nam, 1-nữ, 2-khác
        /// </summary>
        public int Gender { get; set; }
        /// <summary>
        /// tên giới tính
        /// </summary>
        public string GenderName { get; set; }
        /// <summary>
        /// ngày sinh
        /// </summary>
        public DateTime DateOfBirth { get; set; }
        /// <summary>
        /// số điện thoại
        /// </summary>
        /// 
        [Required]
        [CheckDuplicate]
        [PhoneNumber]
        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }
        /// <summary>
        /// email
        /// </summary>
        /// 
        [Required]
        [CheckDuplicate]
        [Email]
        [DisplayName("Email")]
        public string Email { get; set; }
        /// <summary>
        /// địa chỉ
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// số chứng minh thư
        /// </summary>
        /// 
        [Required]
        [CheckDuplicate]
        [DisplayName("Số chứng minh thư")]
        public string IdentityNumber { get; set; }
        /// <summary>
        /// ngày cấp chứng minh thư
        /// </summary>
        public DateTime IdentityDate { get; set; }
        /// <summary>
        /// nơi cấp chứng minh thư
        /// </summary>
        public string IdentityPlace { get; set; }
        /// <summary>
        /// ngày gia nhập công ty
        /// </summary>
        public DateTime JoinDate { get; set; }
        /// <summary>
        /// khóa ngoại mã phòng ban
        /// </summary>
        public Guid DepartmentID { get; set; }
        /// <summary>
        /// tên phòng ban
        /// </summary>
        public string DepartmentName { get; set; }
        /// <summary>
        /// khóa ngoại vị trí/ chức vụ
        /// </summary>
        public Guid PossitionID { get; set; }
        /// <summary>
        /// tên chức vụ
        /// </summary>
        public string PossitionName { get; set; }
        /// <summary>
        /// trạng thái làm việc: 0-nghỉ việc, 1-đang thực tập, 2-đang thử việc, 3-đang làm việc
        /// </summary>
        public int WorkStatus { get; set; }
        /// <summary>
        /// tên tạng thái công việc
        /// </summary>
        public string WorkStatusName { get; set; }
        /// <summary>
        /// mã số thuế cá nhân
        /// </summary>
        public string PersonalTaxCode { get; set; }
        /// <summary>
        /// mức lương
        /// </summary>
        public Double Salary { get; set; }

    }
}
