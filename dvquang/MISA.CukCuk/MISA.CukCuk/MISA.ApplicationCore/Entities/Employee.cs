using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// classs nhân viên
    /// </summary>
    public class Employee:BaseEntity
    {
        #region Properties
        /// <summary>
        /// id nhân viên
        /// </summary>
        [PrimaryKey]
        public Guid EmployeeId { get; set; }
        /// <summary>
        /// mã nhân viên
        /// </summary>
        [Required]
        [CheckDuplicate]
        [DisplayName("Mã nhân viên")]
        [MaxLength(20, "Mã nhân viên không vượt quá 20 kí tự")]
        public string EmployeeCode { get; set; }
        /// <summary>
        /// Họ tên nhân viên
        /// </summary>
        [Required]
        [DisplayName("Họ và tên")]
        public string FullName { get; set; }
        /// <summary>
        /// ngày tháng năm sinh
        /// </summary>
        public DateTime? DateOfBirth { get; set; }
        /// <summary>
        /// giới tính
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
                    case 2: return "Khác";
                    case 3: return "không xác định";
                    default: return "không";
                }
            }

        }
        /// <summary>
        /// số chứng minh thư nhân dân/ căng cước công dân
        /// </summary>
        [Required]
        [CheckDuplicate]
        [DisplayName("Số chứng minh thư nhân dân")]
        public string IdentityNumber { get; set; }
        /// <summary>
        /// ngày cấp chứng minh thư nhân dân/ căn cước công dân
        /// </summary>
        public DateTime? IdentityDate { get; set; }
        /// <summary>
        /// Noi cap cmnd
        /// </summary>
        public string IdentityPlace { get; set; }
        /// <summary>
        /// địa chỉ email
        /// </summary>
        [Required]
        [Email]
        public string Email { get; set; }
        /// <summary>
        /// số điện thoại
        /// </summary>
        [Required]
        [CheckDuplicate]
        [DisplayName("số điện thoại")]
        public string PhoneNumber { get; set; }
        /// <summary>
        /// địa chỉ
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// id vị trí làm việc
        /// </summary>
        public Guid? PositionId { get; set; }
        /// <summary>
        /// id phòng ban làm việc
        /// </summary>
        public Guid? DepartmentId { get; set; }
        /// <summary>
        /// mã số thuế cá nhân
        /// </summary>
        public string PersonalTaxCode { get; set; }
        /// <summary>
        /// mức lương
        /// </summary>
        public Double? Salary { get; set; }
        /// <summary>
        /// ngày tham gia công ty
        /// </summary>
        public DateTime? JoinDate { get; set; }
        /// <summary>
        /// tình trạng công việc
        /// </summary>
        public int? WorkStatus { get; set; }
        public string WorkStatusName
        {
            get
            {
                switch (WorkStatus)
                {
                    case 0: return "Đã nghỉ việc";
                    case 1: return "Đang làm việc";
                    case 2: return "Đang thử việc";                 
                    case 3: return "";
                    default: return null;
                }
            }

        }
        #endregion

    }
}
