using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces.IModelRepos;
using System;
using System.Collections.Generic;
using System.Text;
using Dapper;
using System.Data;
using System.Linq;

namespace MISA.Infarstructure
{
    public class EmployeeRepos: BaseRepos<Employee>,IEmployeeRepos
    {
        public EmployeeRepos(IConfiguration configuration): base(configuration)
        {
            
        }

        public IMethodResult<List<Employee>> GetEmployeeByPropertyValue(String propertyValue)
        {
            var parameters = new DynamicParameters();
            parameters.Add("PropertyName", propertyValue, DbType.String);
            var result = conn.Query<Employee>($"Proc_Get{_tableName}ByPropertyValue", parameters, commandType: CommandType.StoredProcedure).ToList();
            return MethodResult<List<Employee>>.ResultWithData(result, totalRecord: result.Count);
        }
    }
}
