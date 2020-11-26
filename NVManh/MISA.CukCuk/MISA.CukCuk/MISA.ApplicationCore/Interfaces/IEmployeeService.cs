using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEmployeeService
    {
        IEnumerable<Employee> GetEmployees();
        Employee GetEmployeeById(Guid employeeId);
        ServiceResult AddEmployee(Employee employee);
        ServiceResult UpdateEmployee(Employee employee);
        ServiceResult DeleteEmployee(Guid employeeId);
    }
}
