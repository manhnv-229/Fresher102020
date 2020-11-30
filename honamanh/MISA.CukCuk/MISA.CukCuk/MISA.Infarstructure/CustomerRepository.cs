using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;


namespace MISA.Infarstructure
{
    public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
    {
        public CustomerRepository(IConfiguration configuration):base(configuration)
        {

        }
        public Customer GetCustomerByCode(string customerCode)
        {
            var customerDuplicate = _dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return customerDuplicate;
        }
        public Customer GetAllCustomerByCode(Customer customer)
        {
            throw new NotImplementedException();
        }

        public Customer GetAllCustomerByPhoneNumber(Customer customer)
        {
            throw new NotImplementedException();
        }

        //#region Declare
        //IConfiguration _configuration;
        //string _connectionString = string.Empty;
        //IDbConnection _dbConnection = null;
        //#endregion
        //#region Constructor
        //public CustomerContext(IConfiguration configuration)
        //{
        //    //Kết nối database
        //    _configuration = configuration;
        //    _connectionString= _configuration.GetConnectionString("MISACukCukConnectionString");
        //    _dbConnection = new MySqlConnection(_connectionString);
        //}
        //#endregion
        //#region Method
        //public IEnumerable<Customer> GetCustomers()
        //{
        //    //Khởi tạo các commandtext
        //    var customers = _dbConnection.Query<Customer>("Proc_GetCustomers", commandType: CommandType.StoredProcedure);
        //    //Trả về dữ liệu
        //    return customers;
        //}

        //public Customer GetCustomerById(string customerId)
        //{
        //    var customer = _dbConnection.Query<Customer>("Proc_GetCustomerById", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure).FirstOrDefault();
        //    return customer;
        //}

        //public int InsertCustomer(Customer customer)
        //{
        //    var param = MappingDbType(customer);
        //    //Thực thi các mã lệnh
        //    //var customers = dbConnection.Query<Customer>("SELECT * FROM View_Customer ORDER BY CreatedDate ASC", commandType: CommandType.Text);
        //    var rowAffected = _dbConnection.Execute("Proc_InsertCustomer", param, commandType: CommandType.StoredProcedure);

        //    //Trả về số bản ghi thêm mới được            
        //    return rowAffected;
        //}

        //public int UpdateCustomer(Customer customer)
        //{
        //    var param = MappingDbType(customer);
        //    var rowAffected = _dbConnection.Execute("Proc_UpdateCustomer", param, commandType: CommandType.StoredProcedure);
        //    return rowAffected;
        //}

        //public int DeleteCustomer(string customerId)
        //{
        //    var rowAffected = _dbConnection.Execute("Proc_DeleteCustomer", new { CustomerId = customerId }, commandType: CommandType.StoredProcedure);
        //    return rowAffected;
        //}

        //public Customer GetCustomerByCode(string customerCode)
        //{
        //    var customerByCode = _dbConnection.Query<Customer>("Proc_GetCustomerByCode", new { CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
        //    return customerByCode;
        //}

        //public Customer GetAllCustomerByCode(Customer customer)
        //{
        //    var customerId = customer.CustomerId;
        //    string customerIdString = customerId.ToString("D");
        //    var customerCode = customer.CustomerCode;
        //    var customerByCode = _dbConnection.Query<Customer>("Proc_GetAllCustomerByCode", new { CustomerId = customerIdString, CustomerCode = customerCode }, commandType: CommandType.StoredProcedure).FirstOrDefault();
        //    return customerByCode;
        //}

        //public Customer GetAllCustomerByPhoneNumber(Customer customer)
        //{
        //    var customerId = customer.CustomerId;
        //    string customerIdString = customerId.ToString("D");
        //    var phoneNumber = customer.PhoneNumber;
        //    var customersByPhoneNumber = _dbConnection.Query<Customer>("Proc_GetAllCustomerByPhoneNumber", new { CustomerId = customerIdString, PhoneNumber = phoneNumber }, commandType: CommandType.StoredProcedure).FirstOrDefault();
        //    return customersByPhoneNumber;
        //}

        //private DynamicParameters MappingDbType<T>(T entity) {
        //    var properties = entity.GetType().GetProperties();
        //    var param = new DynamicParameters();
        //    foreach (var property in properties)
        //    {
        //        var propertyName = property.Name;
        //        var propertyValue = property.GetValue(entity);
        //        var propertyType = property.PropertyType;
        //        if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
        //        {
        //            param.Add($"@{propertyName}", propertyValue, DbType.String);

        //        }
        //        else
        //        {
        //            param.Add($"@{propertyName}", propertyValue);
        //        }
        //    }
        //    return param;
        //}

        //#endregion

    }
}
