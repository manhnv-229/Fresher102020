using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerRepository: IBaseRepository<Customer>
    {
        Customer GetCustomerByCode(string customerCode);

    }
}
