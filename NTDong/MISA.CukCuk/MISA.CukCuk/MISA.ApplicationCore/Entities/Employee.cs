using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Thông tin nhân viên
    /// </summary>
    /// CreatedBy: NTDong (26/11/2020)
    public class Employee : BaseEntity
    {
        public Guid EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public string FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int? Gender { get; set; }
        /// <summary>
        /// Tên giới tính 
        /// </summary>
        public string GenderName
        {
            get
            {
                switch (Gender)
                {
                    case 0: return "Nữ";
                    case 1: return "Nam";
                    case 3: return "Khác";
                    default: return "Không xác định";
                }
            }

        }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }


        public string Address { get; set; }
        public string IdentityNumber { get; set; }
        public DateTime? IdentityDate { get; set; }
        /// <summary>
        /// Nơi cấp chứng minh thư
        /// </summary>
        public string IdentityPlace { get; set; }
        /// <summary>
        /// Thời gian tham gia vào công ty
        /// </summary>
        public DateTime? JoinDate { get; set; }
        /// <summary>
        /// Mã số thuế cá nhân
        /// </summary>
        public string PersonalTaxCode { get; set; }

        public string DepartmentName { get; set; }
        public double? Salary { get; set; }

        /// <summary>
        /// Trình độ học vấn
        /// </summary>
        public int? EducationalBackground { get; set; }
        /// <summary>
        /// Trạng thái công việc
        /// </summary>
        public int? WorkStatus { get; set; }
        /// <summary>
        /// Tên trạng thái công việc
        /// </summary>
        public string WorkStatusName
        {
            get
            {
                switch (WorkStatus)
                {
                    case 0: return "Đã nghỉ việc";
                    case 1: return "Đang thử việc";
                    case 3: return "Đang làm việc";
                    default:
                        return "Không xác định";
                }
            }

        }
        /// <summary>
        /// Khóa ngoại, mã vị trí/chức vụ
        /// </summary>
        public Guid PositionId { get; set; }
        
        /// <summary>
        /// Khóa ngoại, mã phòng ban
        /// </summary>
        public Guid DepartmentId { get; set; }
       
    }
}
