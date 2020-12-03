using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
   public interface IEmployeeService : IBaseService<Employee>
    {
        /// <summary>
        /// Lọc nhân viên theo tiêu chí
        /// </summary>
        /// <param name="specs">Mã, tên hoặc số điện thoại</param>
        /// <param name="departmentId">Mã phòng ban</param>
        /// <param name="positionId">Mã vị trí</param>
        /// <returns>Danh sách nhân viên thỏa mãn tiêu chí</returns>
        /// CreatedBy: NTNghia (03/12/2020)
        IEnumerable<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId);
    }
}
