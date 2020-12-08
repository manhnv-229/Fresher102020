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


    }
}
