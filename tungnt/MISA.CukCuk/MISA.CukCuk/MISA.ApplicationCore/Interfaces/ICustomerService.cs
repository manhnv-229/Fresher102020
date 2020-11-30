using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerService: IBaseService<Customer>
    {
        Customer GetCustomerByCode(string customerCode);
        Customer GetCustomerByPhoneNumber(string phoneNumber);
    }
}
