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

namespace MISA.Infarstructure
{
    public class CustomerRepos:BaseRepos<Customer> ,ICustomerRepos
    {        
    }
}
