using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Entities
{
    /// <summary>
    /// Nhân viên
    /// </summary>
    /// CreatedBy: NamPV (23/11/2020)
    public class Employee
    {
        #region Field

        #endregion
        #region Properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid EmployeeId { get; set; }
        /// <summary>
        /// mã khách hàng
        /// </summary>
        public string EmployeeCode { get; set; }
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
        /// Số chứng minh thư nhân dân
        /// </summary>
        public string IdentityNumber { get; set; }
        /// <summary>
        /// Ngày cấp chứng minh thư nhân dân
        /// </summary>
        public DateTime IdentityDate { get; set; }
        /// <summary>
        /// Nơi cấp chúng minh thư nhân dân
        /// </summary>
        public string IdentityPlace { get; set; }
        /// <summary>
        /// Ngày vào làm
        /// </summary>
        public DateTime JoinDate { get; set; }
        /// <summary>
        /// Tình trạng hôn nhân
        /// </summary>
        public int? MaritalStatus { get; set; }
        /// <summary>
        /// Nền giáo dục
        /// </summary>
        public int? EducationalBackGround { get; set; }
        /// <summary>
        /// ID trình độ chuyên môn 
        /// </summary>
        public string QualificationId { get; set; }
        /// <summary>
        /// ID phòng ban
        /// </summary>
        public string DepartmentId { get; set; }
        /// <summary>
        /// ID chức vụ
        /// </summary>
        public string PositionId { get; set; }
        /// <summary>
        /// Tình trạng làm việc
        /// </summary>
        public int? WorkStatus { get; set; }
        /// <summary>
        /// Mã số thuế ca nhân
        /// </summary>
        public string PersonalTaxCode { get; set; }
        /// <summary>
        /// Mức lương
        /// </summary>
        public double Salary { get; set; }
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
