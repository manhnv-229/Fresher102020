using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.Infrastructure
{
    public class EmployeeRepository: BaseRepository<Employee> , IEmployeeRepository
    {
        public EmployeeRepository(IConfiguration configuration) : base(configuration)
        {

        }

        public Employee GetEmployeeByCode(string employeeCode)
        {
            var customerDuplicate = _dbConnection.Query<Employee>($"SELECT * FROM Employee WHERE EmployeeCode = '{employeeCode}'", commandType: CommandType.Text).FirstOrDefault();
            return customerDuplicate;
        }

        public Employee GetEmployeeById(string employeeId)
        {
            throw new NotImplementedException();
        }

        public List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId)
        {
            // tạo tham số đầu vào cho store
            var parameters = new DynamicParameters();
            var input = specs != null ? specs : string.Empty;
            parameters.Add("@EmployeeCode", input, DbType.String);
            parameters.Add("@FullName", input, DbType.String);
            parameters.Add("@PhoneNumber", input, DbType.String);
            parameters.Add("@DepartmentId", departmentId, DbType.String);
            parameters.Add("@PositionId", positionId, DbType.String);
            var employees = _dbConnection.Query<Employee>("Proc_GetEmployeeFilter", parameters, commandType: CommandType.StoredProcedure).ToList();
            return employees;
        }
    }
}
