﻿using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class EmployeeService: BaseService<Employee>, IEmployeeService
    {
        #region Constructor
        IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository) : base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        #endregion

        #region Method
        protected override bool CustomValidate(Employee employee)
        {
            //validate riêng tại con:
            return true;
        }

        public IEnumerable<Employee> GetEmployeesByDepartment(Guid departmentId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> GetEmployeesByPosition(Guid positionId)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}