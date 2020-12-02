using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerRepository:IBaseRepository<Customer>
    {
        
        /// <summary>
        ///  Lấy khách hàng theo mã khách hàng
        /// </summary>
        /// <param name="customerCode">Mã khách hàng</param>
        /// <returns>obj khách hàng</returns>
        /// CreatedBy: NTANH 25/11/2020
        Customer GetCustomerByCode(string customerCode);        
    }
}
