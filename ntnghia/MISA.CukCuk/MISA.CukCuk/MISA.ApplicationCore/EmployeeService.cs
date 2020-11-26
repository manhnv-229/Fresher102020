using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class EmployeeService: BaseService<Employee>, IEmployeeService
    {
        #region Constructor
        public EmployeeService(IBaseRepository<Employee> baseRepository) : base(baseRepository)
        {
        }
        #endregion

        #region Method

        ////Lấy danh sách khách hàng:
        //public IEnumerable<Employee> GetEmployees()
        //{
        //    var employees = _employeeRepository.GetEmployees();
        //    return employees;
        //}

        ////Lấy khách hàng theo id:
        //public Employee GetEmployeeById(string employeeId)
        //{
        //    var employee = _employeeRepository.GetEmployeeById(employeeId);
        //    return employee;
        //}

        //public Employee GetEmployeeByCode(string employeeId)
        //{
        //    var employee = _employeeRepository.GetEmployeeById(employeeId);
        //    return employee;
        //}

        ////Thêm mới khách hàng:
        //public ServiceResult AddEmployee(Employee employee)
        //{
        //    var serviceResult = new ServiceResult();
        //    //validate dữ liệu, nếu dữ liệu chưa hợp lệ thì trả về lỗi
        //    //Check trường bắt buộc nhập
        //    var employeeCode = employee.EmployeeCode;
        //    if (string.IsNullOrEmpty(employeeCode))
        //    {
        //        var msg = new
        //        {
        //            devMsg = new { fieldName = "EmployeeCode", msg = "Mã khách hàng không được phép để trống" },
        //            userMsg = "Mã khách hàng không được phép để trống",
        //            Code = MISACode.NotValid,
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Mã khách hàng không được phép để trống";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }

        //    //Check trùng mã
        //    var res = _employeeRepository.GetEmployeeByCode(employeeCode);
        //    if (res != null)
        //    {
        //        var msg = new
        //        {
        //            devMsg = new { fieldName = "EmployeeCode", msg = "Mã khách hàng đã tồn tại" },
        //            userMsg = "Mã khách hàng đã tồn tại",
        //            Code = MISACode.NotValid,
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Mã khách hàng đã tồn tại";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }

        //    //Thêm mới khi dữ liệu đã hợp lệ:
        //    var rowAffects = _employeeRepository.AddEmployee(employee);
        //    serviceResult.MISACode = MISACode.IsValid;
        //    serviceResult.Messenger = "Thêm thành công";
        //    serviceResult.Data = rowAffects;
        //    return serviceResult;
        //}

        ////Sửa thông tin khách hàng:
        //public ServiceResult UpdateEmployee(Employee employee)
        //{
        //    var serviceResult = new ServiceResult();
        //    //validate dữ liệu, nếu dữ liệu chưa hợp lệ thì trả về lỗi
        //    //Check trường bắt buộc nhập
        //    var employeeCode = employee.EmployeeCode;
        //    if (string.IsNullOrEmpty(employeeCode))
        //    {
        //        var msg = new
        //        {
        //            devMsg = new { fieldName = "EmployeeCode", msg = "Mã khách hàng không được phép để trống" },
        //            userMsg = "Mã khách hàng không được phép để trống",
        //            Code = MISACode.NotValid,
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Mã khách hàng không được phép để trống";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }

        //    //Check trùng mã
        //    var res = _employeeRepository.GetEmployeeByCode(employeeCode);
        //    if (res != null)
        //    {
        //        var msg = new
        //        {
        //            devMsg = new { fieldName = "EmployeeCode", msg = "Mã khách hàng đã tồn tại" },
        //            userMsg = "Mã khách hàng đã tồn tại",
        //            Code = MISACode.NotValid,
        //        };
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Mã khách hàng đã tồn tại";
        //        serviceResult.Data = msg;
        //        return serviceResult;
        //    }

        //    //Thêm mới khi dữ liệu đã hợp lệ:
        //    var rowAffects = _employeeRepository.AddEmployee(employee);
        //    serviceResult.MISACode = MISACode.IsValid;
        //    serviceResult.Messenger = "Thêm thành công";
        //    serviceResult.Data = rowAffects;
        //    return serviceResult;
        //}

        ////Xóa khách hàng:
        //public ServiceResult DeleteEmployee(string employeeId)
        //{
        //    var serviceResult = new ServiceResult();
        //    // Kiểm tra id của khách hàng có hợp lệ:
        //    var employee = _employeeRepository.GetEmployeeById(employeeId);
        //    if (employee != null)
        //    {
        //        var rowAffects = _employeeRepository.DeleteEmployee(employeeId);

        //        serviceResult.MISACode = MISACode.IsValid;
        //        serviceResult.Messenger = "Xóa thành công";
        //        serviceResult.Data = rowAffects;
        //    }
        //    else
        //    {
        //        serviceResult.MISACode = MISACode.NotValid;
        //        serviceResult.Messenger = "Không tồn tại khách hàng";
        //        serviceResult.Data = 0;
        //    }
        //    return serviceResult;
        //}

        #endregion
    }
}
