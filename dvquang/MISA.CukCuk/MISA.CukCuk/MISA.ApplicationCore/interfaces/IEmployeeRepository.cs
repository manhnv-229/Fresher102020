using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.interfaces
{
    public interface IEmployeeRepository: IBaseRepository<Employee>
    {
        #region Method
        Employee GetEmployeeByCode(string employeeCode);
        /// <summary>
        /// lọc dữ liệu nhan viên theo các thuộc tính
        /// </summary>
        /// <param name="spec">tên, mã , số điện thoại</param>
        /// <param name="departmentId">id phòng ban</param>
        /// <param name="positionId">id vị trí làm việc</param>
        /// <returns></returns>
        /// CreatedBy: DVQuang (09/12/2020)
        List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId);
        #endregion
    }
}
