using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;

namespace MISA.ApplicationCore.Services
{
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : BaseEntity
    {
        #region Declare
        IBaseRepository<TEntity> _baseRepository;
        ServiceResult _serviceResult;
        #endregion

        #region Construcor
        public BaseService(IBaseRepository<TEntity> baseRepository)
        {
            _baseRepository = baseRepository;
            _serviceResult = new ServiceResult() { MISACode = MISACode.Success };
        }
        #endregion

        #region Property

        #endregion

        #region Method
        public virtual ServiceResult Add(TEntity entity)
        {
            entity.EntityState = EntityState.AddNew;
            if (Validate(entity))
            {
                _serviceResult.MISACode = MISACode.Isvalid;
                _serviceResult.Data = _baseRepository.Add(entity);
                _serviceResult.Messenger = "Thêm thành công";
                return _serviceResult;
            }
            return _serviceResult;
        }

        public ServiceResult Delete(Guid entityId)
        {
            _serviceResult.Data = _baseRepository.Delete(entityId);
            _serviceResult.MISACode = MISACode.Isvalid;
            _serviceResult.Messenger = "Xóa bản ghi thành công";
            return (_serviceResult);
        }

        public IEnumerable<TEntity> GetEntities()
        {
            var entities = _baseRepository.GetEntities();
            return (entities);
        }
        public ServiceResult Update(TEntity entity)
        {
            entity.EntityState = EntityState.Update;
            if (Validate(entity))
            {
                _serviceResult.MISACode = MISACode.Isvalid;
                _serviceResult.Data = _baseRepository.Update(entity);
                _serviceResult.Messenger = "Sửa thành công";
                return _serviceResult;
            }
            return _serviceResult;
        }

        private bool Validate(TEntity entity)
        {
            var isValidate = true;
            var properties = entity.GetType().GetProperties();
            var messageError = new List<string>();
            foreach (var property in properties)
            {
                var displayNameAttributes = property.GetCustomAttributes(typeof(DisplayName), true);
                var displayName = string.Empty;
                var propertyValue = property.GetValue(entity);
                if (displayNameAttributes.Length > 0)
                {
                    displayName = (displayNameAttributes[0] as DisplayName).Name;
                }
                if (property.IsDefined(typeof(Required), false))
                {

                    if (propertyValue == null || propertyValue == String.Empty)
                    {
                        isValidate = false;
                        _serviceResult.MISACode = MISACode.Notvalid;
                        messageError.Add(string.Format(Properties.Resources.Msg_Duplicate, displayName));
                        _serviceResult.Messenger = Properties.Resources.Msg_IsNotValid;
                    }

                }
                if (property.IsDefined(typeof(CheckDuplicate), false))
                {
                    var entityDuplicate = _baseRepository.GetEntityByProperty(entity, property);
                    if (entityDuplicate != null)
                    {
                        isValidate = false;
                        _serviceResult.MISACode = MISACode.Notvalid;
                        messageError.Add($"Thông tin {displayName} đã tồn tại");
                        _serviceResult.Messenger = "Dữ liệu không hợp lệ";
                    }
                }
                if (property.IsDefined(typeof(MaxLength), false))
                {
                    var maxLengthAttribute = property.GetCustomAttributes(typeof(MaxLength), true)[0];
                    var length = (maxLengthAttribute as MaxLength).Value;
                    var msg = (maxLengthAttribute as MaxLength).ErrorMsg;
                    if (propertyValue.ToString().Trim().Length > length)
                    {
                        isValidate = false;
                        _serviceResult.MISACode = MISACode.Notvalid;
                        messageError.Add(msg);
                        _serviceResult.Messenger = "Dữ liệu không hợp lệ";
                    }
                }
            }
            _serviceResult.Data = messageError;
            if (isValidate == true)
                isValidate = CustomValidate(entity);
            return isValidate;
        }
        protected virtual bool CustomValidate(TEntity entity)
        {
            return true;
        }
        #endregion
    }
}
