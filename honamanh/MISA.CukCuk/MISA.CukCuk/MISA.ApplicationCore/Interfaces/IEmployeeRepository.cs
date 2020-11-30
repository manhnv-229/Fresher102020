using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEmployeeRepository
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
        /// <summary>
        /// Lấy khách hàng qua mã khách hàng
        /// </summary>
        /// <param name="EmployeeCode">Mã khách hàng</param>
        /// <returns>Khách hàng</returns>
        /// CreatedBy: HNANH (26/11/2020)
        Employee GetEmployeeByCode(string employeeCode);
        /// <summary>
        /// Lấy danh sách khách hàng qua mã khách hàng
        /// </summary>
        /// <param name="Employee">Object khách hàng</param>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: HNANH (26/11/2020)
        Employee GetAllEmployeeByCode(Employee employee);
        /// <summary>
        /// Lấy danh sách khách hàng qua số điện thoại
        /// </summary>
        /// <param name="Employee">Object khách hàng</param>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: HNANH (26/11/2020)
        Employee GetAllEmployeeByPhoneNumber(Employee employee);

    }
}
