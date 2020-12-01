using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
     public interface IEmployeeService
    {

        #region Delarce
        #endregion

        #region Constructor
        #endregion

        #region Method
        /// <summary>
        /// Lấy danh sách nhân viên
        /// </summary>
        /// <returns>List danh sách nhân viên</returns>
        /// CreatedBy: NTANH 26/11/2020
        IEnumerable<Employee> GetEmployees();

        /// <summary>
        /// Thông tin nhân viên
        /// </summary>
        /// <param name="employeeId">Khóa chính</param>
        /// <returns>obj nhân viên</returns>
        /// CreatedBy: NTANH 26/11/2020
        Employee GetEmployeeById(string employeeId);

        /// <summary>
        /// Thông tin nhân viên
        /// </summary>
        /// <param name="employeeCode">Mã nhân viên</param>
        /// <returns>obj nhân viên</returns>
        /// CreatedBy: NTANH 26/11/2020
        Employee GetEmployeeByCode(string employeeCode);

        /// <summary>
        /// Thêm nhân viên
        /// </summary>
        /// <param name="employee">obj nhân viên</param>
        /// <returns>Thêm mới nhân viên</returns>
        /// CreatedBy: NTANH 26/11/2020
        Employee AddEmployee(Employee employee);

        /// <summary>
        /// Sửa thông tin nhân viên
        /// </summary>
        /// <param name="employee">obj nhân viên</param>
        /// <returns>Thông tin nhân viên vừa sửa</returns>
        /// CreatedBy: NTANH 26/11/2020
        ServiceResult UpdateEmployee(Employee employee);

        /// <summary>
        /// Xóa nhân viên
        /// </summary>
        /// <param name="employeeId">Khóa chính</param>
        /// <returns>Số bản ghi thay đổi</returns>
        /// CreatedBy: NTANH 26/11/2020
        int DeleteEmployee(string employeeId);
        #endregion
    }
}
