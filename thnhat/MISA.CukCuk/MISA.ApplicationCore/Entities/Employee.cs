using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Đối tượng Nhân viên
    /// </summary>
    public class Employee : BaseEntity
    {
        #region Delare

        #endregion

        #region Constructor

        #endregion

        #region Property

        /// <summary>
        /// Khóa chính
        /// </summary>
        [PrimaryKey]
        [CheckDuplicate]
        [DisplayName("Khóa chính")]
        public Guid EmployeeId { get; set; }

        /// <summary>
        /// Mã nhân viên
        /// </summary>
        [Required]
        [CheckDuplicate]
        [DisplayName("Mã nhân viên")]
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Họ và tên
        /// </summary>
        [Required]
        [DisplayName("Họ và tên")]
        public string FullName { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        [DisplayName("Ngày sinh")]
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Khóa ngoại bảng Gender
        /// </summary>
        [DisplayName("Khóa ngoại bảng Gender")]
        public Guid? GenderId { get; set; }

        /// <summary>
        /// Giới tính
        /// </summary>
        public string GenderName { get; set; }

        /// <summary>
        /// Số CMTND/ Căn cước
        /// </summary>
        [Required]
        [DisplayName("Số CMTND/ Căn cước")]
        public string EmployeeIdentityCode { get; set; }

        /// <summary>
        /// Ngày cấp CMT
        /// </summary>
        [DisplayName("Ngày cấp CMT")]
        public DateTime? DateOfLicense { get; set; }

        /// <summary>
        /// Nơi cấp CMT
        /// </summary>
        [DisplayName("Nơi cấp CMT")]
        public string PlaceOfLicense { get; set; }

        /// <summary>
        /// Địa chỉ Email
        /// </summary>
        [Required]
        [DisplayName("Địa chỉ Email")]
        public string Email { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        [Required]
        [CheckDuplicate]
        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Khóa ngoại bảng Position
        /// </summary>
        [DisplayName("Khóa ngoại bảng Position")]
        public Guid? PositionId { get; set; }

        /// <summary>
        /// Chức vụ
        /// </summary>
        public string PositionName { get; set; }

        /// <summary>
        /// Khóa ngoại bảng Department
        /// </summary>
        [DisplayName("Khóa ngoại bảng Department")]
        public Guid? DepartmentId { get; set; }

        /// <summary>
        /// Phòng ban
        /// </summary>
        public string DepartmentName { get; set; }

        /// <summary>
        /// Mã số thuế cá nhân
        /// </summary>
        [DisplayName("Mã số thuế cá nhân")]
        public string EmployeeTaxCode { get; set; }

        /// <summary>
        /// Mức lương cơ bản
        /// </summary>
        [DisplayName("Mức lương cơ bản")]
        public decimal Salary { get; set; }

        /// <summary>
        /// Ngày gia nhập công ty
        /// </summary>
        [DisplayName("Ngày gia nhập công ty")]
        public DateTime? DateJoin { get; set; }

        /// <summary>
        /// Khóa ngoại bảng State
        /// </summary>
        [DisplayName("Khóa ngoại bảng State")]
        public Guid? StateId { get; set; }

        /// <summary>
        /// Trạng thái công việc
        /// </summary>

        public string StateName { get; set; }
        #endregion

        #region Method

        #endregion
    }
}
