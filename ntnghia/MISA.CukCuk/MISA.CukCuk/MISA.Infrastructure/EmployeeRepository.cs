using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace MISA.Infrastructure
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        #region Declare
        #endregion

        public EmployeeRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public IEnumerable<Employee> GetEmployeesFilter(string specs, Guid? departmentId, Guid? positionId)
        {
            //build tham số đầu vào cho store:
            var input = specs != null ? specs : string.Empty;
            var parameters = new DynamicParameters();
            parameters.Add("@EmployeeCode", input, DbType.String);
            parameters.Add("@FullName", input, DbType.String);
            parameters.Add("@PhoneNumber", input, DbType.String);
            parameters.Add("@DepartmentId", departmentId, DbType.String);
            parameters.Add("@PositionId", positionId, DbType.String);
            var employees = _dbConnection.Query<Employee>("Proc_GetEmployeeFilter", parameters,commandType: CommandType.StoredProcedure);
            return employees;
        }

        #region Method

        #endregion
    }
}
