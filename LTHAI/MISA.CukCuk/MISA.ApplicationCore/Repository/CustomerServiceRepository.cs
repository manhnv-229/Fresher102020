using MISA.ApplicationCore.Entities;
using System.Collections.Generic;
using MISA.ApplicationCore.Interface;

namespace MISA.ApplicationCore.Repository
{
    /// <summary>
    /// Thực thi các phương thức của ICustomerServiceRepository
    /// </summary>
    public class CustomerServiceRepository: ICustomerServiceRepository
    {
        #region Attribute
        private readonly ICustomerRepository _customerRepository;
        #endregion
        #region Contructor
        public CustomerServiceRepository(ICustomerRepository customerRepository)
        {
            this._customerRepository = customerRepository;
        }
        #endregion
        #region Method
        public IEnumerable<Customer> GetCustomers()
        {
            return _customerRepository.GetCustomers();
        }
        public Customer GetCustomerById(string id)
        {
            var customer = _customerRepository.GetCustomerById(id);
            return customer;
        }
        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">Thông tin mới khách hàng</param>
        /// <returns>Object thông báo</returns>
        /// CreatedBy: LTHAI(23/11/2020)
        public ServiceResult AddCustomer(Customer customer)
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
            var res = _customerRepository.GetCustomerByCode(customerCode);
            if (res == null)
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
            var rowEffects = _customerRepository.AddCustomer(customer);
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
            var rowAffects = _customerRepository.UpdateCustomer(id, customer);
            return new ServiceResult() { Data = rowAffects, MisaCode = MISACode.IsValid };
        }
   
        /// <summary>
        /// Xóa khách hàng theo khóa chính
        /// </summary>
        /// <param name="id">Khóa chính (CustomerId)</param>
        /// <returns>Số lượng bản ghi bị ảnh hưởng</returns>
        /// CreatedBy: LTHAI(24/11/2020)
        public ServiceResult DeleteCustomerById(string id)
        {
            var rowAffects = _customerRepository.DeleteCustomerById(id);
            return new ServiceResult() { Data = rowAffects, MisaCode = MISACode.IsValid };
        }

        #endregion
    }
}
