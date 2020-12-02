using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface.RepositoryInterface;
using MISA.Infrastructure.BaseRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.Infrastructure.Repository
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        private readonly IConfiguration configuration;
        public EmployeeRepository(IConfiguration configuration) : base(configuration)
        {

        }

        public Employee GetEmployeeCodeMax()
        {
            var entities = dbConnection.Query<Employee>($"Proc_GetEmployeeCodeMax", commandType: CommandType.StoredProcedure).FirstOrDefault();
            // Trả về
            return entities;
        }

        public IEnumerable<Employee> GetEmployeesByDepartMentId(string departmentId)
        {
            var entities = dbConnection.Query<Employee>($"Proc_GetEmployeesByDepartmentId", new { DepartmentId  = departmentId}, commandType: CommandType.StoredProcedure);
            // Trả về
            return entities;
        }

        public IEnumerable<Employee> GetEmployeesByDynamicValue(string value)
        {
            var entities = dbConnection.Query<Employee>($"Proc_GetEmployeesByCodeOrNameOrPhoneNumber", new { Value = value }, commandType: CommandType.StoredProcedure);
            // Trả về
            return entities;
        }

        public IEnumerable<Employee> GetEmployeesByPositionId(string positionId)
        {
            var entities = dbConnection.Query<Employee>($"Proc_GetEmployeesByPositionId", new { PositionId = positionId },commandType: CommandType.StoredProcedure);
            // Trả về
            return entities;
        }
    }
}
