using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.interfaces
{
    public interface IEmployeeService:IBaseService<Employee>
    {
        IEnumerable<Employee> GetEmployeePading(int limit, int offset);
        List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId);

    }
}
