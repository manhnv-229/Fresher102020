using Entity.Models;
using MISA.ApplicationCore.Entities;
using MISA.Entity.Models;
using MISA.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class CustomerService
    {
        #region Method
        /// <summary>
        /// Lấy toàn bộ danh sách khách hàng
        /// </summary>
        /// <returns>Danh sách khách hàng</returns>
        /// CreatedBy: LTHAI(23/11/2020)
        public IEnumerable<Customer> GetCustomers()
        {
            CustomerDbContext customerDbContext = new CustomerDbContext();
            return customerDbContext.GetCustomers();
        }
        public Customer GetCustomerById(string id)
        {
            CustomerDbContext customerDbContext = new CustomerDbContext();
            var customer = customerDbContext.GetCustomerById(id);
            return customer;
        }
        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">Thông tin mới khách hàng</param>
        /// <returns>Object thông báo</returns>
        /// CreatedBy: LTHAI(23/11/2020)
        public ServiceResult InsertCustomer(Customer customer)
        {
            // Validate dữ liệu trường bắt buộc
            var customerCode = customer.CustomerCode;
            if (string.IsNullOrEmpty(customerCode))
            {
                // Trả về obj thông báo lỗi
                ServiceResult serviceResult = new ServiceResult()
                {
                    Data = new { fieldName = "CustomerCode", Msg = "Trường customerCode không được để trống" },
                    Message = "Trường customerCode không được để trống",
                    MisaCode = MISACode.NotValid
                };
                return serviceResult;
            }
            // Validate trùng CustomerCode
            // + Lấy khách hàng thông qua CustomerCode
            CustomerDbContext customerDbContext = new CustomerDbContext();
            var res = customerDbContext.GetCustomerByCode(customerCode);
            if (res != null)
            {
                // Trả về obj thông báo lỗi
                ServiceResult serviceResult = new ServiceResult()
                {
                    Data = new { fieldName = "CustomerCode", Msg = "Trường customerCode đã tồn tại" },
                    Message = "Trường customerCode đã tồn tại",
                    MisaCode = MISACode.NotValid
                };
                return serviceResult;
            }
            // Gọi hàm thêm mới khách hàng 
            var rowEffects = customerDbContext.InsertCustomer(customer);
            return new ServiceResult() { Data = rowEffects, MisaCode = MISACode.IsValid };
              
        }
        /// <summary>
        /// Sửa thông tin khách hàng
        /// </summary>
        /// <param name="id">Khóa chính (CustomerId)</param>
        /// <param name="customer">Thông tin khách hàng cần cập nhật</param>
        /// <returns>Object thông báo</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        public ServiceResult UpdateCustomer(string id, Customer customer)
        {
            // Validate dữ liệu trường bắt buộc
            var customerCode = customer.CustomerCode;
            if (string.IsNullOrEmpty(customerCode))
            {
                // Trả về obj thông báo lỗi
                ServiceResult serviceResult = new ServiceResult()
                {
                    Data = new { fieldName = "CustomerCode", Msg = "Trường customerCode không được để trống" },
                    Message = "Trường customerCode không được để trống",
                    MisaCode = MISACode.NotValid
                };
                return serviceResult;
            }
            // Gọi cập nhật khách hàng 
            CustomerDbContext customerDbContext = new CustomerDbContext();
            var rowEffects = customerDbContext.UpdateCustomer(id, customer);
            return new ServiceResult() { Data = rowEffects, MisaCode = MISACode.IsValid };
        }
   
        /// <summary>
        /// Xóa khách hàng theo khóa chính
        /// </summary>
        /// <param name="id">Khóa chính (CustomerId)</param>
        /// <returns>Số lượng bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        public int DeleteCustomerById(string id)
        {
            CustomerDbContext customerDbContext = new CustomerDbContext();
            var rowAffects = customerDbContext.DeleteCustomerById(id);
            return rowAffects;
        }
        #endregion
    }
}
