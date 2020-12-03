using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEmployeeRepository: IBaseRepository<Employee>
    {
        Employee GetEmployeeByCode(string employeeCode);

        /// <summary>
        /// Lấy dữ liệu danh sách nhân viên theo các tiêu chí
        /// </summary>
        /// <param name="specs">theo mã, tên hoặc số điện thoại của nhân viên</param>
        /// <param name="departmentId">Id Phòng ban</param>
        /// <param name="positionId">Id vị trí</param>
        /// <returns>Danh sách nhân viên theo các tiêu chí</returns>
        /// CreatedBy: NVMANH (03/12/2020)
        List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId);
    }
}
