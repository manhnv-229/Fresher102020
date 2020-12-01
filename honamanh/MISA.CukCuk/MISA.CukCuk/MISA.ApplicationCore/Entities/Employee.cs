using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    public class Employee : BaseEntity
    {
        /// <summary>
        /// Khóa chính
        /// </summary>
        /// 
        [PrimaryKey]
        public Guid EmployeeId { get; set; }
        /// <summary>
        /// Mã nhân viên
        /// </summary>
        /// 
        [MaxLength(20)]
        [Required]
        [CheckDuplicate]
        [DisplayName("Mã nhân viên")]
        public string EmployeeCode { get; set; }
        /// <summary>
        /// Họ và đệm của nhân viên
        /// </summary>
        public string FirstName { get; set; }
        /// <summary>
        /// Tên của nhân viên
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// Tên đầy đủ của nhân viên
        /// </summary>
        public string FullName { get; set; }
        /// <summary>
        /// Ngày sinh của nhân viên
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// Giới tính của nhân viên(0: nữ, 1: nam, 2: khác)
        /// </summary>
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
        /// <summary>
        /// Địa chỉ email của nhân viên
        /// </summary>
        /// 
        [Required]
        [DisplayName("Địa chỉ email")]
        public string Email { get; set; }
        /// <summary>
        /// Số điện thoại của nhân viên
        /// </summary>
        /// 
        [Required]
        [CheckDuplicate]
        [DisplayName("Số điện thoại")]
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Đĩa chỉ của nhân viên
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// Số chứng minh thư nhân dân
        /// </summary>
        public string IdentityNumber { get; set; }
        /// <summary>
        /// Ngày cấp chứng minh thư
        /// </summary>
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
        /// <summary>
        /// Lương của nhân viên
        /// </summary>
        public double Salary { get; set; }
        /// <summary>
        /// Tình trạng hôn nhân;
        /// </summary>
        public int? MaritalStatus { get; set; }
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
        /// Tên vị trí/chức vụ
        /// </summary>
        public string PositionName { get; set; }
        /// <summary>
        /// Khóa ngoại, mã phòng ban
        /// </summary>
        public Guid DepartmentId { get; set; }
        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public string DepartmentName { get; set; }
        /// <summary>
        /// Khóa ngoại, mã trình độ chuyên môn
        /// </summary>
        public Guid QualificationId { get; set; }
        /// <summary>
        /// Tên trình độ chuyên môn
        /// </summary>
        public string QualificationName { get; set; }
        //public DateTime? CreatedDate { get; set; }
        //public string CreatedBy { get; set; }
        //public DateTime? ModifiedDate { get; set; }
        //public string ModifiedBy { get; set; }

    }
}
