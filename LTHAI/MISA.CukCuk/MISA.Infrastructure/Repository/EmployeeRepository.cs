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

        public IEnumerable<WorkStatus> GetWorkStatuses()
        {
            var entities = dbConnection.Query<WorkStatus>($"Proc_GetWorkStatuses", commandType: CommandType.StoredProcedure);
            // Trả về
            return entities;
        }
    }
}
