using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.Infarstructure
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(IConfiguration iconfiguration) :base(iconfiguration)
        {
        }

        public Employee GetEmployeeById(Guid employeeId)
        {
            var employee = _dbConnection.Query<Employee>($"Proc_GetEmployeeById", new { EmployeeId = employeeId.ToString() }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return employee;
        }

        public string GetEmployeeCodeMax()
        {
            var employeeCode = _dbConnection.Query<String>($"Proc_GetEmployeeCodeMax",commandType: CommandType.StoredProcedure).FirstOrDefault();
            return employeeCode;
        }

        public List<Employee> GetEmployeePaging(string specs, Guid? DepartmentId, Guid? PositionId)
        {
            var input = specs == null ? string.Empty : specs.ToString();
            var parameters = new DynamicParameters();
            parameters.Add("EmployeeCode",input);
            parameters.Add("FullName", input);
            parameters.Add("PhoneNumber", input);
            parameters.Add("DepartmentId", DepartmentId, DbType.String);
            parameters.Add("PositionId", PositionId, DbType.String);
            var listEmployee = _dbConnection.Query<Employee>($"Proc_GetEmployeePaging", parameters, commandType: CommandType.StoredProcedure).ToList();
            return listEmployee;
        }
    }
}
