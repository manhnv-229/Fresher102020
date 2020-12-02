using System;
using MISA.Common.Models;
using MISA.ApplicationCore.Interfaces;
using MISA.Infrastructure.Interfaces;
using System.Collections.Generic;
using System.Text;
using System.Net.Mail;

namespace MISA.ApplicationCore.Services
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        #region Property
        IEmployeeRepository _employeeRepository;
        #endregion
        #region Constructor
        public EmployeeService(IEmployeeRepository employeeRepository) : base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        #endregion
        #region Method
        public bool CheckEmployeeByCode(string employeeCode)
        {
            return _employeeRepository.CheckEmployeeByCode(employeeCode);
        }

        public string GetMaxEmployeeCode()
        {
            return _employeeRepository.GetMaxEmployeeCode();
        }

        protected override bool Validate(Employee entity, string method)
        {
            var isValid = true;
            if (entity.EmployeeCode.Trim() == "" || entity.FullName.Trim() == "" || entity.Email.Trim() == "" || entity.PhoneNumber.Trim() == "")
            {
                isValid = false;
                validateErrorResponseMsg.Add("Bạn phải nhập thông tin các trường bắt buộc!");
            }
            else
            {
                // Check email:
                try
                {
                    MailAddress mail = new MailAddress(entity.Email);
                }
                catch (FormatException)
                {
                    isValid = false;
                    validateErrorResponseMsg.Add("Email không đúng định dạng!");
                }
                if (method == "POST")
                {
                    // Check trùng mã:
                    var isValidCode = CheckEmployeeByCode(entity.EmployeeCode);
                    if (isValidCode) // Nếu đã có 1 nhân viên có mã như vậy
                    {
                        isValid = false;
                        validateErrorResponseMsg.Add("Mã nhân viên này đã tồn tại!");
                    }
                }
            }
            return isValid;
        }
        #endregion Method
    }
}