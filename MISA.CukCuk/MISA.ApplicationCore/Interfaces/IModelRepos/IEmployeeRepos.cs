using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces.IModelRepos
{
    public interface IEmployeeRepos: IBaseRepos<Employee>
    {
        /// <summary>
        /// tìm kiếm employees theo giá trị của các trường Mã NV, Họ Tên, SĐT
        /// </summary>
        /// <param name="propertyValue">giá trị của property</param>
        /// <returns>MethodResult<List<Employee>></returns>
        public IMethodResult<List<Employee>> GetEmployeeByPropertyValue(string propertyValue);
    }    
}
