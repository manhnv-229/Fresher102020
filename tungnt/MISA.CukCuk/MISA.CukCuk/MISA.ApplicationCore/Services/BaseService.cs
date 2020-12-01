using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace MISA.ApplicationCore
{
    public class BaseService<T> : IBaseService<T> where T : BaseEntity
    {
        IBaseRepository<T> _baseRepository;
        ServiceResult _serviceResult;
        public BaseService(IBaseRepository<T> baseRepository)
        {
            _baseRepository = baseRepository;
            _serviceResult = new ServiceResult() { MISACode = MISACode.Success };
        }

        public ServiceResult Delete(string entityId)
        {

            var serviceResult = new ServiceResult();
            var del = _baseRepository.Delete(entityId);
            serviceResult.MISACode = MISACode.IsValid;
            serviceResult.Messenger = "Xóa thành công";
            serviceResult.Data = del;
            return serviceResult;
        }

        public IEnumerable<T> Get()
        {
            var res = _baseRepository.Get();
            return res;
        }

        public T GetById(string entityId)
        {
            var res = _baseRepository.GetEntityById(entityId);
            return res;
        }


        public virtual ServiceResult Insert(T entity)
        {
            entity.EntityState = EntityState.AddNew;
            var isValidae = Validate(entity);
            if (isValidae == true)
            {
                _serviceResult.Data = _baseRepository.Insert(entity);
                _serviceResult.MISACode = MISACode.IsValid;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }
        }


        public ServiceResult Update(T entity)
        {
            entity.EntityState = EntityState.Update;
            var isValidae = Validate(entity);
            if (isValidae == true)
            {
                _serviceResult.Data = _baseRepository.Update(entity);
                _serviceResult.MISACode = MISACode.IsValid;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }
        }
        private bool Validate(T entity)
        {
            var mesArrayErro = new List<string>();
            var isValidate = true;
            var serviceResult = new ServiceResult();
            // Đọc các Property:
            var properties = entity.GetType().GetProperties();
            foreach (var property in properties)
            {
                var propertyValue = property.GetValue(entity);
                var displayName = property.GetCustomAttributes(typeof(DisplayNameAttribute), true);
                // Kiểm tra xem có attribute cần phải validate không:
                if (property.IsDefined(typeof(Required), false))
                {
                    // Check bắt buộc nhập:
                    if (propertyValue == null || propertyValue == "")
                    {
                        isValidate = false;
                        mesArrayErro.Add($"Thông tin {displayName} không được phép để trống.");
                        _serviceResult.MISACode = MISACode.NotValid;
                        _serviceResult.Messenger = "Dữ liệu không hợp lệ";
                    }
                }

                if (property.IsDefined(typeof(CheckDuplicate), false))
                {
                    // Check trùng dữ liệu:
                    var propertyName = property.Name;
                    var entityDuplicate = _baseRepository.GetEntityByProperty(entity, property);
                    if (entityDuplicate != null)
                    {
                        isValidate = false;
                        mesArrayErro.Add($"Thông tin {displayName} đã có trên hệ thống.");
                        _serviceResult.MISACode = MISACode.NotValid;
                        _serviceResult.Messenger = "Dữ liệu không hợp lệ";
                    }
                }

            }
            _serviceResult.Data = mesArrayErro;
            return isValidate;
        }
    }
}
