using MISA.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    /// <summary>
    /// Thông tin nhân viên
    /// </summary>
    /// CreatedBy: NVMANH (26/11/2020)
    public class Employee:BaseEntity
    {
        public Guid EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string  FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public Enums.Gender? Gender { get; set; }

        public string GenderName
        {
            get {
                var name = string.Empty;
                switch (Gender)
                {
                    case Enums.Gender.Female:
                        name = Properties.Resources.Enum_Gender_Female;
                        break;
                    case Enums.Gender.Male:
                        name = Properties.Resources.Enum_Gender_Male;
                        break;
                    case Enums.Gender.Other:
                        name = Properties.Resources.Enum_Gender_Other;
                        break;
                    default:
                        break;
                }
                return name;
            }
        }

        public string Address { get; set; }
        public Guid? PositionId { get; set; }
        public string PositionName { get; set; }
        public Guid? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public double? Salary { get; set; }

        public WorkStatus? WorkStatus { get; set; }

        public string WorkStatusName
        {
            get
            {
                var name = string.Empty;
                switch (WorkStatus)
                {
                    case Enums.WorkStatus.Resign:
                        name = Properties.Resources.Enum_WorkStatus_Resign;
                        break;
                    case Enums.WorkStatus.Working:
                        name = Properties.Resources.Enum_WorkStatus_Working;
                        break;
                    case Enums.WorkStatus.TrailWork:
                        name = Properties.Resources.Enum_WorkStatus_TrailWork;
                        break;
                    case Enums.WorkStatus.Retired:
                        name = Properties.Resources.Enum_WorkStatus_Retired;
                        break;
                    default:
                        break;
                }
                return name;
            }
        }
    }
}
