using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        //public Customer GetCustomerByCode(string customerCode);
    }
}
