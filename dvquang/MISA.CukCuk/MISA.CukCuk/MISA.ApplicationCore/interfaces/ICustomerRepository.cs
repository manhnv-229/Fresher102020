using MISA.ApplicationCore.Entities;

using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.interfaces
{

    public interface ICustomerRepository:IBaseRepository<Customer>
    {
        #region Method
        Customer GetCustomerByCode(string customerCode);
        #endregion
    }
}
