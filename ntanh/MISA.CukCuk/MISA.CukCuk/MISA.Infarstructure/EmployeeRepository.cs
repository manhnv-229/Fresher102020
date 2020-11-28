using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Dapper;
using System.Linq;

namespace MISA.Infarstructure
{
    public class EmployeeRepository : IEmployeeRepository
    {

        #region Declare
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        IDbConnection _dbConnection;
        #endregion 

        #region Constructor
        public EmployeeRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
            _dbConnection = new MySqlConnection(_connectionString);
        }
        #endregion

        #region Method
        public Employee AddEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }

        public int DeleteEmployee(string employeeId)
        {
            var rowAffects = _dbConnection.Execute("PROC_DeleteEmployee", new { EmployeeId = employeeId }, commandType: CommandType.StoredProcedure);
            return rowAffects;
        }

        public Employee GetEmployeeByCode(string employeeCode)
        {
            var employee = _dbConnection.Query<Employee>("PROC_GetEmployeeByCode", new { EmployeeCode = employeeCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return employee;
        }

        public Employee GetEmployeeById(string employeeId)
        {
            var employee = _dbConnection.Query<Employee>("PROC_GetEmployeeById", new { EmployeeId = employeeId }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return employee;
        }

        public IEnumerable<Employee> GetEmployees()
        {
            var employees = _dbConnection.Query<Employee>("PROC_GetEmployees", commandType: CommandType.StoredProcedure);
            return employees;
        }

        public ServiceResult UpdateEmployee(Employee employee)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
