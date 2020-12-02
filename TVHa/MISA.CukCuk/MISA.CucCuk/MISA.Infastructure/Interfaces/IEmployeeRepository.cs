using MISA.Common.Models;
using MISA.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Infrastructure.Interfaces
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        /// <summary>
        /// Kiểm tra trùng mã hay không
        /// </summary>
        /// <param name="employeeCode"> mã nhân viên </param>
        /// Author: TVHa (27/11/2020)
        /// <returns></returns>
        bool CheckEmployeeByCode(string employeeCode);

        /// <summary>
        /// Lấy ra mã khách hàng lớn nhất trong hệ thống
        /// </summary>
        /// Author: TVHa (27/11/2020)
        /// <returns></returns>
        string GetMaxEmployeeCode();
    }
}