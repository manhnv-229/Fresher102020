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
        /// Lấy mã nhân viên lớn nhất
        /// </summary>
        /// <returns>Nhân viên</returns>
        /// CreatedBy: LTHAI(2/12/2020)
        public Employee GetEmployeeCodeMax();
        /// <summary>
        /// Lấy nhân viên theo mã phòng ban
        /// </summary>
        /// <param name="departmentId">Khóa chính phòng ban</param>
        /// <returns>Danh sách nhân viên</returns>
        ///  CreatedBy: LTHAI(2/12/2020)
        public IEnumerable<Employee> GetEmployeesByDepartMentId(string departmentId);
        /// <summary>
        /// Lấy nhân viên theo mã chức vụ
        /// </summary>
        /// <param name="departmentId">Khóa chính chức vụ</param>
        /// <returns>Danh sách nhân viên</returns>
        ///  CreatedBy: LTHAI(2/12/2020)
        public IEnumerable<Employee> GetEmployeesByPositionId(string positionId);
        /// <summary>
        /// Lấy danh sách nhân viên theo giá trị nhập vào
        /// </summary>
        /// <param name="value">giá trị tùy biến</param>
        /// <returns>Danh sách nhân viên</returns>
        /// CreatedBy:LTHAI(2/12/2020)
        public IEnumerable<Employee> GetEmployeesByDynamicValue(string value);
    }
}
