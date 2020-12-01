using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface.BaseInterface;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interface.ServiceInterface
{
    /// <summary>
    /// Nơi viết nghiệp vụ cho khách hàng
    /// CreatedBy: LTHAI(30/11/2020)
    /// </summary>
    public interface IEmployeeService : IBaseService<Employee>
    {
        /// <summary>
        /// Nghiệp vụ lấy trạng thái làm việc
        /// </summary>
        /// <returns>Danh sách trạng thái làm việc</returns>
        /// CreatedBy: LTHAI(1/12/2020)
        public IEnumerable<WorkStatus> GetWorkStatuses();
        /// <summary>
        /// Lấy mã nhân viên lớn nhất
        /// </summary>
        /// <returns>Nhân viên</returns>
        public Employee GetEmployeeCodeMax();
    }
}
