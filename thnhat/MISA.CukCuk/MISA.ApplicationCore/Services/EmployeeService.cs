using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    public class EmployeeService : BaseService<Employee>,IEmployeeService
    {
        #region Declare
        IEmployeeRepository _employeeRepository;
        #endregion

        #region Constructor
        public EmployeeService(IEmployeeRepository employeeRepository) : base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        #endregion

        #region Property
        #endregion

        #region Method
        public Employee GetEmployeeById(Guid employeeId)
        {
            return _employeeRepository.GetEmployeeById(employeeId);
        }

        public string GetEmployeeCodeMax()
        {
            return _employeeRepository.GetEmployeeCodeMax();
        }

        public List<Employee> GetEmployeePaging(string specs, Guid? DepartmentId, Guid? PositionId)
        {
            return _employeeRepository.GetEmployeePaging(specs, DepartmentId, PositionId);
        }
        #endregion





    }
}
