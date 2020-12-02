using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface ICustomerService:IBaseService<Employee>
    {
        /// <summary>
        /// Lay du lieu phan trang 
        /// </summary>
        /// <param name="limit"></param>
        /// <param name="offset"></param>
        /// <returns></returns>
        /// CreatedBy: NTDong(26/11/2020)
        IEnumerable<Employee> GetCustomerPaging(int limit, int offset);
        /// <summary>
        /// Lay danh sach khach hang theo nhom khach hang 
        /// </summary>
        /// <param name="groupId">id nhom khach hang</param>
        /// <returns></returns>
        /// CreatedBy: NTDong(26/11/2020)
        IEnumerable<Employee> GetCustomersByGroup(Guid groupId);
    }
}
