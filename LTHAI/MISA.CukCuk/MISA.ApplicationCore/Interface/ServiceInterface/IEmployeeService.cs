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
        /// Lấy mã nhân viên lớn nhất
        /// </summary>
        /// <returns>Nhân viên</returns>
        public Employee GetEmployeeCodeMax();
        /// <summary>
        /// Nghiệp vụ lấy nhân viên theo mã phòng ban
        /// </summary>
        /// <param name="departmentId">Khóa chính phòng ban</param>
        /// <returns>Danh sách nhân viên</returns>
        ///  CreatedBy: LTHAI(2/12/2020)
        public IEnumerable<Employee> GetEmployeesByDepartMentId(string departmentId);
        /// <summary>
        /// Nghiệp vụ lấy theo mã chức vụ
        /// </summary>
        /// <param name="departmentId">Khóa chính chức vụ</param>
        /// <returns>Danh sách nhân viên</returns>
        ///  CreatedBy: LTHAI(2/12/2020)
        public IEnumerable<Employee> GetEmployeesByPositionId(string positionId);
        /// <summary>
        /// Nghiệp vụ lấy danh sách nhân viên theo giá trị nhập vào
        /// </summary>
        /// <param name="value">giá trị tùy biến</param>
        /// <returns>Danh sách nhân viên</returns>
        /// CreatedBy:LTHAI(2/12/2020)
        public IEnumerable<Employee> GetEmployeesByDynamicValue(string value);
    }
}
