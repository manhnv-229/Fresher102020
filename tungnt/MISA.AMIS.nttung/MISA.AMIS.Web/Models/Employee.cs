using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.Amis.Models
{
    public class Employee
    {
        public static List<Employee> employeeList = new List<Employee>();

        public string EmployeeCode { get; set; }
        public string FullName { get; set; }
        public int Gender { get; set; }
        public string DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string IdentityNumber { get; set; }
        public string IdentityDate { get; set; }
        public string IdentityPlace { get; set; }
        public string PositionName { get; set; }
        public string DepartmentName { get; set; }
        public string PersonalTaxCode { get; set; }
        public string JoinDate { get; set; }
        public int Salary { get; set; }
        public string WorkStatusName { get; set; }
    }
}