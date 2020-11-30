using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace MISA.Infarstructure
{
    //public class EmployeeRepository : IEmployeeRepository
    //{
        //#region Declare
        //IConfiguration _configuration;
        //string _connectionString = string.Empty;
        //IDbConnection _dbConnection = null;
        //#endregion
        //#region Constructor
        //public EmployeeRepository(IConfiguration configuration)
        //{
        //    _configuration = configuration;
        //    _connectionString = _configuration.GetConnectionString("MISACukCukConnectionString");
        //    _dbConnection = new MySqlConnection(_connectionString);
        //}
        //#endregion
        //public int DeleteEmployee(string employeeId)
        //{
        //    throw new NotImplementedException();
        //}

        //public Employee GetAllEmployeeByCode(Employee employee)
        //{
        //    throw new NotImplementedException();
        //}

        //public Employee GetAllEmployeeByPhoneNumber(Employee employee)
        //{
        //    throw new NotImplementedException();
        //}

        //public Employee GetEmployeeByCode(string employeeCode)
        //{
        //    throw new NotImplementedException();
        //}

        //public Employee GetEmployeeById(string employeeId)
        //{
        //    throw new NotImplementedException();
        //}

        //public IEnumerable<Employee> GetEmployees()
        //{
        //    var employees = _dbConnection.Query<Employee>("SELECT * FROM Employee", commandType: CommandType.Text);
        //    //Trả về dữ liệu
        //    return employees;
        //}

        //public int InsertEmployee(Employee employee)
        //{
        //    throw new NotImplementedException();
        //}

        //public int UpdateEmployee(Employee employee)
        //{
        //    throw new NotImplementedException();
        //}
    //}
}
