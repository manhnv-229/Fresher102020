using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerService:IBaseService<Employee>
    {
        /// <summary>
        /// Lấy dữ liệu phân trang 
        /// </summary>
        /// <param name="limit"></param>
        /// <param name="offset"></param>
        /// <returns></returns>
        /// CreatedBy: NTDong(26/11/2020)
        IEnumerable<Employee> GetCustomerPaging(int limit, int offset);
        /// <summary>
        /// Lây danh sách khách hàng theo nhóm khách hàng 
        /// </summary>
        /// <param name="groupId">id nhóm khách hàng</param>
        /// <returns></returns>
        /// CreatedBy: NTDong(26/11/2020)
        IEnumerable<Employee> GetCustomersByGroup(Guid groupId);
    }
}
