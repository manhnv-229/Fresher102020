using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Common.Models
{
    public class Employee
    {
        #region Constructor
        #endregion Constructor
        #region Property
        /// <summary>
        /// Khóa chính (ID nhân viên)
        /// </summary>
        public Guid EmployeeId { get; set; }

        /// <summary>
        /// Mã nhân viên
        /// </summary>
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Tên nhân viên
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Giới tính
        /// </summary>
        public int Gender { get; set; }

        /// <summary>
        /// Số điện thoại di động
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Mã chức vụ
        /// </summary>
        public Guid? PositionId { get; set; }

        /// <summary>
        /// Tên chức vụ
        /// </summary>
        public string PositionName { get; set; }

        /// <summary>
        /// Mã phòng ban
        /// </summary>
        public Guid? DepartmentId { get; set; }

        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public string DepartmentName { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Số tiền lương
        /// </summary>
        public double? Salary { get; set; }

        /// <summary>
        /// Số chứng minh thư nhân nhân / hộ chiếu
        /// </summary>
        public string IdentityNumber { get; set; }

        /// <summary>
        /// Ngày cấp chứng minh thư / hộ chiếu
        /// </summary>
        public DateTime? IdentityDate { get; set; }

        /// <summary>
        /// Nơi cấp chứng minh thư / Hộ chiếu
        /// </summary>
        public string IdentityPlace { get; set; }

        /// <summary>
        /// Tình trạng công việc
        /// </summary>
        public int WorkStatus { get; set; }

        /// <summary>
        /// Mã số thuế
        /// </summary>
        public string TaxCode { get; set; }

        /// <summary>
        /// Ngày gia nhập công ty
        /// </summary>
        public DateTime? JoinDate { get; set; }

        /// <summary>
        /// Link ảnh đại diện
        /// </summary>
        public string Avatar { get; set; }
        #endregion Property
        #region Method
        #endregion Method
    }
}