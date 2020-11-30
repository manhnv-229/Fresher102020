using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using Z.Dapper.Plus;
using System.Linq;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Interfaces.IModelRepos;
using Microsoft.Extensions.Configuration;

namespace MISA.Infarstructure
{
    public class CustomerRepos:BaseRepos<Customer> ,ICustomerRepos
    {     
        public CustomerRepos(IConfiguration configuration): base(configuration) { }

        public MethodResult GetCustomerForDepartment(Guid id)
        {
            throw new NotImplementedException();
        }

        public string GetCustomerCode(string customerCode)
        {
            var data = conn.ExecuteScalar<string>($"select CustomerCode from Customer where CustomerCode= '{customerCode}'");
            return data;
        }
    }
}
