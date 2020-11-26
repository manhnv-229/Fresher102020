using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEmployeeRepository
    {
        /// <summary>
        /// Lấy danh sách khách hàng
        /// </summary>
        /// <returns>Dánh sách khách hàng</returns>
        /// CreatedBy: NVMANH (26/11/2020)
        IEnumerable<Employee> GetEmployees();
        Employee GetEmployeeById(Guid employeeId);
        int AddEmployee(Employee employee);
        int UpdateEmployee(Employee employee);
        int DeleteEmployee(Guid employeeId);
        Employee GetEmployeeByCode(string employeeCode);
    }
}
