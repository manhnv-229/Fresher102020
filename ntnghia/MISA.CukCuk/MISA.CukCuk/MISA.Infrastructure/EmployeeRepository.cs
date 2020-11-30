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

        public IEnumerable<Employee> GetEmployeesByDepartment(Guid departmentId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> GetEmployeesByPosition(Guid positionId)
        {
            throw new NotImplementedException();
        }

        #region Method

        #endregion
    }
}
