using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces.Base;
using MISA.ApplicationCore.Interfaces.IModelRepos;
using MISA.ApplicationCore.Interfaces.IModelServices;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Service
{
    public class EmployeeService: BaseService<Employee>, IEmployeeService
    {
        IEmployeeRepos _employeeRepos;
        public EmployeeService(IEmployeeRepos employeeRepos): base(employeeRepos)
        {
            _employeeRepos = employeeRepos;
        }
        /// <summary>
        /// tìm kiếm employees theo giá trị của các trường Mã NV, Họ Tên, SĐT
        /// </summary>
        /// <param name="propertyValue">giá trị của property</param>
        /// <returns>MethodResult<List<Employee>></returns>
        public IMethodResult<List<Employee>> GetEmployeeByPropertyValue(string propertyValue)
        {
            var result = _employeeRepos.GetEmployeeByPropertyValue(propertyValue);
            return result;
        }
    }
}
