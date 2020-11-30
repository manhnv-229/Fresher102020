using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Entities.Base;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : BaseEntity
    {
        private readonly IRepository<TEntity> _repository;

        private readonly ServiceResult _serviceResult;

        public BaseService(IRepository<TEntity> repository)
        {
            _repository = repository;
            //
            _serviceResult = new ServiceResult() { MISACode = MISACode.Success };
        }

        public ServiceResult DeleteEntityById(Guid entityId)
        {
            _serviceResult.Data = _repository.DeleteEntityById(entityId);
            return _serviceResult;
        }

        public TEntity GetEntityById(Guid entityId)
        {
            var entity = _repository.GetEntityById(entityId);
            return entity;
        }

        public IEnumerable<TEntity> GetEntities()
        {
            var entities = _repository.GetEntities();
            return entities;
        }

        public virtual ServiceResult InsertEntity(TEntity entity)
        {
            entity.EntityState = EntityState.AddNew;
            // Validate dữ liệu
            var validate = Validate(entity);
            if (validate == true)
            {
                _serviceResult.Data = _repository.InsertEntity(entity);
                _serviceResult.MISACode = MISACode.IsValid;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }
        }

        public ServiceResult UpdateEntity(TEntity entity)
        {
            entity.EntityState = EntityState.Update;
            // Validate dữ liệu
            var validate = Validate(entity);
            if (validate == true)
            {
                _serviceResult.Data = _repository.InsertEntity(entity);
                _serviceResult.MISACode = MISACode.IsValid;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }
        }

        private bool Validate(TEntity entity)
        {
            var isValid = true;
            var mess = new List<String> { };
            var properties = entity.GetType().GetProperties();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var displayName = property.GetCustomAttribute(typeof(DisplayNameAttribute), true);
                // validate trường không được để trống
                if (property.IsDefined(typeof(Required), false))
                {
                    if (propertyValue == null)
                    {
                        isValid = false;
                        mess.Add($"Thông tin {displayName} không được để trống");
                        _serviceResult.Messenger = "Dữ liệu không hợp lệ.";
                        _serviceResult.MISACode = MISACode.NotValid;
                    }
                }
                // Validate dữ liệu bị trùng
                if (property.IsDefined(typeof(Duplicate), false))
                {
                    var entityDuplicate = _repository.GetEntityByProperty(entity, property);
                    if (entityDuplicate != null)
                    {
                        isValid = false;
                        mess.Add($"Thông tin {((DisplayNameAttribute)displayName).DisplayName} đã tồn tại trên hệ thống.");
                        _serviceResult.Messenger = "Dữ liệu không hợp lệ.";
                        _serviceResult.MISACode = MISACode.NotValid;
                    }
                }
                // Validate số lượng ký tự tối đa được phép nhập
                if (property.IsDefined(typeof(MaxLength), false))
                {

                }
            }
            _serviceResult.Data = mess;
            if (isValid == false)
                ValidateCustom(entity);
            return isValid;
        }

        protected void ConvertDataType(string dataType, object obj)
        {

        }

        protected virtual bool ValidateCustom(TEntity entity)
        {
            return true;
        }
    }
}
