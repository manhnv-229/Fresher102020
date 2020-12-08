using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        IEmployeeRepository _employeeRepository;
        #region Constructor
        public EmployeeService(IEmployeeRepository employeeRepository) : base(employeeRepository)
        {
            _employeeRepository = employeeRepository;

        }


        #endregion

        public Employee GetEmployeeById(string employeeId)
        {
            throw new NotImplementedException();
        }
        public IEnumerable<Employee> GetEmployeePading(int limit, int offset)
        {
            throw new NotImplementedException();
        }
    }
}
