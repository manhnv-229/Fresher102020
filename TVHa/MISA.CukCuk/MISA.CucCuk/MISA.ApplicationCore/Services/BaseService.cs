using System;
using MISA.ApplicationCore.Interfaces;
using MISA.Infrastructure.Interfaces;
using MISA.Common.Models;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    public class BaseService<T> : IBaseService<T>
    {
        #region Property
        IBaseRepository<T> _baseRepository;
        protected List<string> validateErrorResponseMsg = new List<string>();
        #endregion Property
        #region Constructor
        public BaseService(IBaseRepository<T> employeeRepository)
        {
            _baseRepository = employeeRepository;
        }
        #endregion Constructor
        #region Method
        public ServiceResponse Delete(Guid recordId)
        {
            var serviceResponse = new ServiceResponse();
            serviceResponse.Success = true;
            serviceResponse.Msg.Add("Thành công!");
            serviceResponse.Data = _baseRepository.Delete(recordId);
            return serviceResponse;
        }

        public IEnumerable<T> GetData()
        {
            return _baseRepository.GetData();
        }

        public IEnumerable<T> GetDataByPage(int page, int record)
        {
            return _baseRepository.GetDataByPage(page, record);
        }

        public T GetById(object recordId)
        {
            return _baseRepository.GetById(recordId);
        }

        public ServiceResponse Insert(T obj)
        {
            var serviceResponse = new ServiceResponse();
            if (Validate(obj, "POST") == true) //check thông tin
            {
                serviceResponse.Success = true;
                serviceResponse.Msg.Add("Thành công!");
                serviceResponse.Data = _baseRepository.Insert(obj);
            }
            else
            {
                serviceResponse.Success = false;
                serviceResponse.Msg = validateErrorResponseMsg;
            }
            return serviceResponse;
        }

        public ServiceResponse Update(T obj)
        {
            var serviceResponse = new ServiceResponse();
            if (Validate(obj, "PUT") == true)
            {
                serviceResponse.Success = true;
                serviceResponse.Msg.Add("Thành công!");
                serviceResponse.Data = _baseRepository.Update(obj);
            }
            else
            {
                serviceResponse.Success = false;
                serviceResponse.Msg = validateErrorResponseMsg;
            }
            return serviceResponse;
        }

        /// <summary>
        /// Kiểm tra thông tin trước khi thêm hoặc sửa (sẽ thực hiện tại các lớp kế thừa)
        /// </summary>
        /// <param name="entity"> Đối tượng </param>
        /// Author: TVHa (28/11/2020)
        /// <returns></returns>
        protected virtual bool Validate(T entity, string Method)
        {
            return true;
        }
        #endregion Method
    }
}