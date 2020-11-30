using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace MISA.ApplicationCore.Repository
{
    public abstract class BaseService<TEntity> : IBaseService<TEntity> where TEntity: BaseEntity
    {
        private readonly IBaseRepository<TEntity> _baseRepository;
        #region Contructor
        public BaseService(IBaseRepository<TEntity> baseRepository)
        {
            this._baseRepository = baseRepository;
        }

        public virtual object Add(TEntity entity)
        {
            return _baseRepository.Add(entity);
        }

        public virtual object Delete(string entityId)
        {
            return _baseRepository.Delete(entityId);
        }

        public TEntity GetById(string entityId)
        {
            return _baseRepository.GetById(entityId);
        }

        public IEnumerable<TEntity> Gets()
        {
            return _baseRepository.Gets();
        }

        public virtual object Update(string entityId, TEntity entity)
        {
            return _baseRepository.Update(entityId, entity);
        }
        public ServiceResult Validate(TEntity entity)
        {
            var serviceResult = new ServiceResult();
            // Đọc các property 
            var properties = entity.GetType().GetProperties();
            foreach (var property in properties)
            {
               
                //Check attribute bắt buộc nhập
                if (property.IsDefined(typeof(Require), false))
                {
                    var propertyValue = property.GetValue(entity);

                    if (propertyValue == null)
                    {
                        var displayName = property.GetCustomAttributes(typeof(DisplayName), true)[0];
                        var propertyName = (displayName as DisplayName).Name;
                        serviceResult.Data = new { fieldName = displayName, Msg = $"Trường {propertyName} không được để trống" };
                        serviceResult.Message = $"Trường {propertyName} không được để trống";
                        serviceResult.MisaCode = MISACode.NotValid;
                        return serviceResult;
                    }
                }
                // Check trùng lặp dữ liệu
                if (property.IsDefined(typeof(CheckExist), false))
                {
                    var entityExist = _baseRepository.GetEntityByProperty(entity, property);
                    if (entityExist != null)
                    {
                        var displayName = property.GetCustomAttributes(typeof(DisplayName), true)[0];
                        var propertyName = (displayName as DisplayName).Name;
                        serviceResult.Data = new { fieldName = propertyName, Msg = $"Trường {propertyName} đã tồn tại" };
                        serviceResult.Message = $"Trường {propertyName} đã tồn tại";
                        serviceResult.MisaCode = MISACode.NotValid;
                        return serviceResult;
                    }
                }
                if (property.IsDefined(typeof(MaxLength), false))
                {
                    var propertyValue = property.GetValue(entity);
                    var AttributeMaxLength = property.GetCustomAttributes(typeof(MaxLength), true)[0];
                    int length = (AttributeMaxLength as MaxLength).Length;
                    string msg = (AttributeMaxLength as MaxLength).ErrorMessage;
                    if (propertyValue.ToString().Trim().Length > length)
                    {
                        var displayName = property.GetCustomAttributes(typeof(DisplayName), true)[0];
                        var propertyName = (displayName as DisplayName).Name;
                        serviceResult.Data = new { fieldName = propertyName, msg };
                        serviceResult.Message = msg;
                        serviceResult.MisaCode = MISACode.NotValid;
                        return serviceResult;
                    }
                }
            }
            return null;
        }

        
        #endregion

    }
}
