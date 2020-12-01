using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    /// <summary>
    /// Interface Danh mục khách hàng 
    /// </summary>
    /// Created By : NTDong(23/11/2020)
    public interface ICustomerRepository:IBaseRepository<Customer>
    {
        /// <summary>
        /// Lay thong tin khasch hang theo ma khach hang 
        /// </summary>
        /// <param name="customerCode"></param>
        /// <returns></returns>
        Customer GetCustomeByCode(string customerCode);
    }
}
