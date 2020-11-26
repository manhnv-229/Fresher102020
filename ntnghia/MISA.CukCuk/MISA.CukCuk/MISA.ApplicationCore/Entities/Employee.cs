using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    public class Employee
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
        /// Địa chỉ
        /// </summary>
        public string Address { get; set; }

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

        public string IdentityNumber { get; set; }

        public DateTime? IdentityDate { get; set; }

        public string IdentityPlace { get; set; }

        public DateTime? JoinDate { get; set; }

        public int MaritalStatus { get; set; }

        public string PersonalTaxCode { get; set; }

        /// <summary>
        /// Số tiền nợ
        /// </summary>
        public double? Salary { get; set; }

        /// <summary>
        /// Số thẻ thành viên
        /// </summary>
        public int EducationalBackground { get; set; }

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

        public Guid? QualificationId { get; set; }

        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        #endregion

        #region Method

        #endregion 
    }
}
