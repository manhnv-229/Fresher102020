using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerService: IBaseService<Customer>
    {
        IEnumerable<Customer> GetCustomerByCode(int limit, int offset);
        IEnumerable<Customer> GetCustomerByGroupId(Guid CustomerGroupId);
    }
}
