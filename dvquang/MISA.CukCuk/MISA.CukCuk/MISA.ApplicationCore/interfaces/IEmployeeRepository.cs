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

        #endregion
    }
}
