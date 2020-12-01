using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    class Employee
    {
        #region Properties
        /// <summary>
        /// id nhân viên
        /// </summary>
        public Guid EmployeeId { get; set; }
        /// <summary>
        /// mã nhân viên
        /// </summary>
        public string EmployeeCode { get; set; }
        /// <summary>
        /// Họ tên nhân viên
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// ngày tháng năm sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// giới tính
        /// </summary>
        public int Gender { get; set; }
        /// <summary>
        /// số chứng minh thư nhân dân/ căng cước công dân
        /// </summary>
        public string IdentityNumber { get; set; }
        /// <summary>
        /// ngày cấp chứng minh thư nhân dân/ căn cước công dân
        /// </summary>
        public string IdentityDate { get; set; }
        /// <summary>
        /// địa chỉ email
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// số điện thoại
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// id vị trí làm việc
        /// </summary>
        public string PositionId { get; set; }
        /// <summary>
        /// id phòng ban làm việc
        /// </summary>
        public string DepartmentId { get; set; }
        /// <summary>
        /// mã số thuế cá nhân
        /// </summary>
        public string PersonalTaxCode { get; set; }
        /// <summary>
        /// mức lương
        /// </summary>
        public string Salary { get; set; }
        /// <summary>
        /// ngày tham gia công ty
        /// </summary>
        public DateTime? JoinDate { get; set; }
        /// <summary>
        /// tình trạng công việc
        /// </summary>
        public string WorkStatus { get; set; }
        /// <summary>
        /// ngày tạo bản ghi
        /// </summary>
        public DateTime? CreatedDate { get; set; }
        /// <summary>
        /// người tạo
        /// </summary>
        public string CreatedBy { get; set; }
        /// <summary>
        /// ngày thay đổi bản ghi
        /// </summary>
        public DateTime? ModifiedDate { get; set; }
        /// <summary>
        ///  người thay đổi
        /// </summary>
        public string ModifiedBy { get; set; }
        #endregion

    }
}
