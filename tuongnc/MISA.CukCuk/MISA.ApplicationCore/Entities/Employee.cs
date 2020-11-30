using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Thông tin nhân viên
    /// CreatedBy: TuongNC (28/11/2020)
    /// </summary>
    class Employee
    {
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid EmployeeId { get; set; }
        /// <summary>
        /// Mã nhân viên
        /// </summary>
        public string EmphoyeeCode { get; set; }
        /// <summary>
        /// Họ 
        /// </summary>
        public string FirtName { get; set; }
        /// <summary>
        /// Tên
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// Họ và tên
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// Ngày sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// thư điện tử
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Giới tính (0-Nữ, 1-Nam, #-Giới tính thứ 3)
        /// </summary>
        public int? Gender { get; set; }
        /// <summary>
        /// địa chỉ
        /// </summary>
        public string Address { get; set; }


    }
}
