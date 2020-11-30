using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
   public interface IEmployeeService: IBaseService<Employee>
    {
        /// <summary>
        /// Lấy danh sách nhân viên theo phòng ban
        /// </summary>
        /// <param name="departmentId"></param>
        /// <returns></returns>
        IEnumerable<Employee> GetEmployeesByDepartment(Guid departmentId);

        /// <summary>
        /// Lấy danh sách nhân viên theo vị trí 
        /// </summary>
        /// <param name="positionId"></param>
        /// <returns></returns>
        IEnumerable<Employee> GetEmployeesByPosition(Guid positionId);
    }
}
