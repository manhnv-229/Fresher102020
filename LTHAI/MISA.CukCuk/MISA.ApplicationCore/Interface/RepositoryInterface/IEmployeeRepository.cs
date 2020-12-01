using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface.BaseInterface;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interface.RepositoryInterface
{
    /// <summary>
    /// Quy định các phương thức thực hiện truy vấn database của nhân viên
    /// CreatedBy: LTHAI(30/11/2020)
    /// </summary>
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        /// <summary>
        /// Lấy toàn bộ danh sách trạng thái làm việc
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
