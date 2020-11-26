using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerService: IBaseService<Customer>
    {
        IEnumerable<Customer> GetCustomerPaging(int limit, int offset);

        IEnumerable<Customer> GetCustomersByDepartment(Guid departmentId);

        /// <summary>
        /// Lấy khách hàng theo mã khách hàng
        /// </summary>
        /// <param name="customerCode">Mã khách hàng</param>
        /// <returns>Object khách hàng đầu tiên lấy được</returns>
        /// CreatedBy: NTNghia (24/11/2020)
        Customer GetCustomerByCode(string customerCode);
    }
}
