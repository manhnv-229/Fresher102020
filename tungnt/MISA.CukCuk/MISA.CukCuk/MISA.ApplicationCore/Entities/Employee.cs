using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    public class Employee
    {
        public Employee() { }

        private Guid employeeId;
        private string taxCode;
        private string emloyeeCode;
        private string fullName;
        private string phoneNumber;
        private string email;
        private string identityCode;
        private string identityPlace;
        private string positionCode;
        private string departmentCode;
 

        public Guid EmployeeId { get => employeeId; set => employeeId = value; }
        public string TaxCode { get => taxCode; set => taxCode = value; }
        public string EmloyeeCode { get => emloyeeCode; set => emloyeeCode = value; }
        public string FullName { get => fullName; set => fullName = value; }
        public string PhoneNumber { get => phoneNumber; set => phoneNumber = value; }
        public string Email { get => email; set => email = value; }
        public string IdentityCode { get => identityCode; set => identityCode = value; }
        public string IdentityPlace { get => identityPlace; set => identityPlace = value; }
        public string PositionCode { get => positionCode; set => positionCode = value; }
        public string DepartmentCode { get => departmentCode; set => departmentCode = value; }
        public DateTime? DateOfBrith { get; set; }
        public int Gender { get; set; }
        public DateTime? IdentityDate { get; set; }
        public decimal Salary { get; set; }
        public DateTime? JoinDate { get; set; }
        public int WorkStatusCode { get; set; }
    }
}
