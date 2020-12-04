using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        /// <summary>
        /// Lấy thông tin nhân viên bằng Id
        /// </summary>
        /// <param name="employeeId">Khóa chính bảng nhân viên</param>
        /// <returns>Nhân viên</returns>
        Employee GetEmployeeById(Guid employeeId);

        /// <summary>
        /// Lấy thông tin danh sách nhân viên theo bộ lọc
        /// </summary>
        /// <param name="specs">điều kiện lọc theo tên, mã nhân viên hoặc số điện thoại</param>
        /// <param name="DepartmentId">Khóa chỉnh bảng phòng ban</param>
        /// <param name="PositionId">Khóa chính bảng chức vụ</param>
        /// <returns>Danh sách nhân viên theo bộ lọc</returns>
        List<Employee> GetEmployeePaging(string specs, Guid? DepartmentId, Guid? PositionId);

        /// <summary>
        /// Hàm lấy về mã nhân viên lớn nhất
        /// </summary>
        /// <returns>Mã nhân viên lớn nhất</returns>
        string GetEmployeeCodeMax();
    }
}
