using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerService:IBaseService<Customer>
    {
        /// <summary>
        /// Lấy dữ liệu phân trang
        /// </summary>
        /// <param name="limit">tối đa</param>
        /// <param name="offset"></param>
        /// <returns>số bản ghi</returns>
        /// CreatedBy: NTANH 1/12/2020
        IEnumerable<Customer> GetCustomerPaging(int limit, int offset);
        
        /// <summary>
        /// Lấy danh sách kahcsh hàng theo nhóm khách hàng
        /// </summary>
        /// <param name="groupId">Id nhóm khách hàng</param>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: NTANH 1/12/2020
        IEnumerable<Customer> GetCustomerByGroup(Guid groupId);
    }
}
