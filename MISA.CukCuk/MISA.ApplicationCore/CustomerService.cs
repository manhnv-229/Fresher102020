using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Entities.Enums;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces;
using MISA.ApplicationCore.Interfaces.IModelRepos;
using MISA.ApplicationCore.Interfaces.IModelService;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class CustomerService: ICustomerService
    {
        ICustomerRepos _configuration;
        public CustomerService(ICustomerRepos configuration)
        {
            _configuration = configuration;
        }

        #region Method
        /// <summary>
        /// lấy danh sách hách hàng
        /// </summary>
        /// <returns>trả về danh sách khách hàng</returns>
        /// createdBy: tqhuy(24/11/2020)
        public IMethodResult<List<Customer>> GetAll()
        {
            var customers = _configuration.GetAll();
            if(customers.Data != null)
            {
                customers.TotalRecord = customers.Data.Count;
            }
            return customers;
        }
        /// <summary>
        /// lấy thông tin khách hàng theo id
        /// </summary>
        /// <param name="id">id khách hàng</param>
        /// <returns>object khách hàng</returns>
        public IMethodResult<Customer> GetById(Guid id)
        {
            var customer = _configuration.GetById(id);
            if(customer.Data != null)
            {
                customer.TotalRecord = 1;
            }
            else
            {
                customer.Message = "không tìm thấy khách hàng có id: " + id;
            }
            return customer;
        }
        /// <summary>
        /// thêm khách hàng
        /// </summary>
        /// <param name="customer">object khách hàng</param>
        /// <returns>số bản ghi bị ảnh hưởng</returns>
        /// createdBy: tqhuy(24/11/2020)
        public IMethodResult Insert(Customer customer)
        {
            var item = _configuration.Insert(customer);
            if (item.Success)
            {
                item.Message = "Thêm dữ liệu thành công";
                item.Status = MISACode.Success;
            }
            return item;           
        }

        public IMethodResult Update(Customer customer)
        {
            var item = _configuration.Update(customer);
            return item;
        }
        /// <summary>
        /// Xóa khách hàng theo id
        /// </summary>
        /// <param name="id">id khách hàng</param>
        /// <returns>số bản ghi bị ảnh hưởng</returns>
        /// createdBy: tquy(24/11/2020)
        public IMethodResult Delete(Guid id)
        {
            var item = _configuration.Delete(id);
            return item;
        }
        #endregion
    }
}
