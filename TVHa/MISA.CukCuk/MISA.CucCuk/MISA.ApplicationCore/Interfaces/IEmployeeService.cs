using System;
using MISA.Common.Models;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IEmployeeService : IBaseService<Employee>
    {
        /// <summary>
        /// Kiểm tra mã nhân viên có tồn tại trong db hay không
        /// </summary>
        /// <param name="employeeCode"> mã nhân viên </param>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        bool CheckEmployeeByCode(string employeeCode);

        /// <summary>
        /// Lấy ra mã nhân viên lớn nhất
        /// Lấy ra mã nhân viên lớn nhất
        /// </summary>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        string GetMaxEmployeeCode();
    }
}