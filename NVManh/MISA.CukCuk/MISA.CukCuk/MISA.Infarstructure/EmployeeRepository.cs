using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.Infarstructure
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        #region DECLARE
        #endregion

        public EmployeeRepository(IConfiguration configuration):base(configuration)
        {
        }

        public override IEnumerable<Employee> GetEntities()
        {
            return base.GetEntities("Proc_GetEmployees");
        }
        public Employee GetEmployeeByCode(string employeeCode)
        {
            return _dbConnection.Query<Employee>($"SELECT * FROM Employee E WHERE EmployeeCode = '{employeeCode}'").FirstOrDefault();
        }

        public List<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId)
        {
            // build tham số đầu vào cho store:
            var input = specs != null ? specs : string.Empty;
            var parameters = new DynamicParameters();
            parameters.Add("@EmployeeCode", input, DbType.String);
            parameters.Add("@FullName", input, DbType.String);
            parameters.Add("@PhoneNumber", input, DbType.String);
            parameters.Add("@DepartmentId", departmentId,DbType.String);
            parameters.Add("@PositionId", positionId, DbType.String);
            var employees = _dbConnection.Query<Employee>("Proc_GetEmployeePaging", parameters, commandType: CommandType.StoredProcedure).ToList();
            return employees;
        }
    }
}
