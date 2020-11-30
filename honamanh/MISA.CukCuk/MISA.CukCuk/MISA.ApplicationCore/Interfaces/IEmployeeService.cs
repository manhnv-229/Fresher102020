using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEmployeeService
    {
        /// <summary>
        /// Lấy toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: HNANH (25/11/2020)
        IEnumerable<Employee> GetEmployees();
        /// <summary>
        /// Lấy dánh sách khách hàng qua Id
        /// </summary>
        /// <param name="EmployeeId">Khóa chính</param>
        /// <returns>Khách hàng có Id = EmployeeId</returns>
        Employee GetEmployeeById(string employeeId);
        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="Employee">Object khách hàng</param>
        /// <returns>Số bản ghi thêm mới</returns>
        /// CreatedBy HNANH (25/11/2020)
        int InsertEmployee(Employee employee);
        /// <summary>
        /// Sửa khách hàng
        /// </summary>
        /// <param name="Employee">Obj khách hàng</param>
        /// <returns>Số bản ghi được sửa</returns>
        /// CreatedBy: HNANH (25/11/2020)
        int UpdateEmployee(Employee employee);
        /// <summary>
        /// Xóa khách hàng
        /// </summary>
        /// <param name="EmployeeId">Khóa chính</param>
        /// <returns>Số bản ghi xóa được</returns>
        /// CreatedBy: HNANH (25/11/2020)
        int DeleteEmployee(string employeeId);
    }
}
