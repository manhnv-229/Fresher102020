using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    public class Employee : BaseEntity
    {
        #region Constructor
        public Employee()
        {

        }
        #endregion

        #region Property
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid EmployeeId { get; set; }

        /// <summary>
        /// Mã khách hàng
        /// </summary>
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Họ và tên
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Giới tính (0 - Nữ, 1 - Nam, 2 - Khác)
        /// </summary>
        public int? Gender { get; set; }

        /// <summary>
        /// Ngày tháng năm sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Địa chỉ email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// Số CMTND/Căn cước
        /// </summary>
        public string IdentityNumber { get; set; }

        /// <summary>
        /// Ngày cấp 
        /// </summary>
        public DateTime? IdentityDate { get; set; }

        /// <summary>
        /// Nơi cấp
        /// </summary>
        public string IdentityPlace { get; set; }

        /// <summary>
        /// Ngày vào công ty
        /// </summary>
        public DateTime? JoinDate { get; set; }

        
        /// <summary>
        /// Mức lương
        /// </summary>
        public double? Salary { get; set; }

        /// <summary>
        /// Tên công ty làm việc
        /// </summary>
        public int WorkStatus { get; set; }

        /// <summary>
        /// Mã số thuế của công ty
        /// </summary>
        public Guid? PositionId { get; set; }

        /// <summary>
        /// Mã văn phòng
        /// </summary>
        public Guid? DepartmentId { get; set; }

        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        #endregion

        #region Method

        #endregion 
    }
}
