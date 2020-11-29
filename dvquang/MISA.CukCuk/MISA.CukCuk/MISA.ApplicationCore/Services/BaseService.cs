using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity:BaseEntity
    {
        IBaseRepository<TEntity> _baseRepository;
        ServiceResult _serviceResult;
        public BaseService(IBaseRepository<TEntity> baseRepository)
        {
            _baseRepository = baseRepository;
            _serviceResult = new ServiceResult() { MISACode = Enums.MISACode.Success };
        }

        public virtual ServiceResult Add(TEntity entityId)
        {
            
            // thuc hien validate
            var isValidate = ValiDate(entityId);
            if (isValidate == true)
            {
                _serviceResult.Data = _baseRepository.Add(entityId);
                _serviceResult.MISACode = Enums.MISACode.IsValid;
                return _serviceResult;
            }
            else
            {
  
                return _serviceResult;
            }

        }

        public ServiceResult Delete(Guid entityId)
        {
            _serviceResult.Data = _baseRepository.Delete(entityId);
            return _serviceResult;
        }

        public IEnumerable<TEntity> GetEntities()
        {
            return _baseRepository.GetEntitis();
        }

        public TEntity GetEntityById(Guid customerId)
        {
            return _baseRepository.GetEntityById(customerId);
        }

        public ServiceResult Update(TEntity entity)
        {
            entity.EntityState = Enums.EntityState.Update;
            var isValidate = ValiDate(entity);
            if (isValidate == true)
            {
                _serviceResult.Data = _baseRepository.Update(entity);
                _serviceResult.MISACode = Enums.MISACode.IsValid;
                return _serviceResult;
            }
            else
            {

                return _serviceResult;
            }

        }
        /// <summary>
        /// validate dữ liệu
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CreatedBy: DVQuang(29/11/2020)
        private bool ValiDate(TEntity entity)
        {
            var isValid = true;
            var serviceResult = new ServiceResult();
            // đọc các properties
            var properties = entity.GetType().GetProperties();
            foreach (var property in properties)
            {
                var propertyValue = property.GetValue(entity);
                var displayName = property.GetCustomAttributes(typeof(DisplayNameAttribute), true);
                // kiểm tra attribute cần phải validate
                if (property.IsDefined(typeof(Required), false))
                {

                    if (propertyValue == null)
                    {
                        isValid = false;
                        _serviceResult.Data = $"Thông tin{displayName} không được phép để trống!";
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                        _serviceResult.Messenger = "Dữ liệu không hợp lệ.";
                    }
                }
                if (property.IsDefined(typeof(CheckDuplicate), false))
                {
                    // check trùng dữ liệu
                    var propertyName = property.Name;
                    var entityDuplicate = _baseRepository.GetEntityByProperty(entity, property);
                    if (entityDuplicate != null)
                    {
                        isValid = false;
                        _serviceResult.Data = $"Thông tin{displayName} đã tồn tạo trong hệ thống!";
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                        _serviceResult.Messenger = "Dữ liệu không hợp lệ.";
                    }
                }
            }
            return isValid;
        }
    } 
}
