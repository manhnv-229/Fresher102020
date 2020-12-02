using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Infarstructure
{
    public class EmployeeService : IEmployeeService
    {
        IEmployeeRepository _employeeRepository;

        #region Constructor
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        #endregion

        public Employee AddEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }

        public int DeleteEmployee(string employeeId)
        {
            var rowAffects = _employeeRepository.DeleteEmployee(employeeId);
            return rowAffects;
        }

        public Employee GetEmployeeByCode(string employeeCode)
        {
            var employee = _employeeRepository.GetEmployeeByCode(employeeCode);
            return employee;
        }

        public Employee GetEmployeeById(string employeeId)
        {
            var employee = _employeeRepository.GetEmployeeById(employeeId);
            return employee;
        }

        public IEnumerable<Employee> GetEmployees()
        {
            var employees = _employeeRepository.GetEmployees();
            return employees;
        }

        public ServiceResult UpdateEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}
