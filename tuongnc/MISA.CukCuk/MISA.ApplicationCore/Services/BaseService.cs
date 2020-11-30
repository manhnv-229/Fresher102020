using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Enums;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace MISA.ApplicationCore.Services
{
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : BaseEntity
    {
        #region Clare
        IBaseRepository<TEntity> _baseRepository;
        ServiceResult _serviceResult; 
        #endregion

        public BaseService(IBaseRepository<TEntity> baseRepository)
        {
            _baseRepository = baseRepository;
            _serviceResult = new ServiceResult() { MISACode = MISACode.Success };
        }

        public virtual ServiceResult Add(TEntity entity)
        {
            entity.EntityStage = EntityStage.Add;
            //ServiceResult serviceResult = new ServiceResult();
            //Validate
            var validate = Validate(entity);
            if (validate == true)
            {
                _serviceResult.Data = _baseRepository.Add(entity);
                _serviceResult.Messenger = "Thêm thành công";
                _serviceResult.MISACode = MISACode.IsValid;
                return _serviceResult;
            }
            else
            {
                //serviceResult.Data = _baseRepository.Add(entity);
                //serviceResult.Messenger = "Thêm không thành công";
                //serviceResult.MISACode = MISACode.NotValid;
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
            return _baseRepository.GetEntities();
        }

        public TEntity GetEntityById(Guid entityId)
        {
            return _baseRepository.GetEntityById(entityId);
        }

        public ServiceResult Update(TEntity entity)
        {
            var validate = Validate(entity);
            if (validate)
            {
                return _serviceResult;
                //return _baseRepository.Update(entity);
            }
            else
                return _serviceResult;
        }

        private bool Validate(TEntity entity)
        {
            var messArrError = new List<string>();
            var isValid = true;
            var properties = entity.GetType().GetProperties();
            // Đọc các property của entity
            foreach (var property in properties)
            {
                //var displayName = null;
                //var displayNameArr = property.GetCustomAttributes(typeof(DisplayNameAttribute), true);
                //if(displayNameArr!=null)
                //displayName = (displayNameArr[0] as DisplayNameAttribute).DisplayName;
                //else
                //    displayName = property.GetCustomAttributes(typeof(DisplayNameAttribute), true);
                var displayName = (property.GetCustomAttributes(typeof(DisplayNameAttribute), true).GetValue(0) as DisplayNameAttribute).DisplayName;
                var propertyValue = property.GetValue(entity);
                // check attribute cần validate không 
                if (property.IsDefined(typeof(Required), false))
                {
                    // check bắt buộc nhập
                    if (propertyValue == null)
                    {
                        messArrError.Add($"Thông tin {displayName} Không được phép để trống");
                        _serviceResult.MISACode = MISACode.NotValid;
                        _serviceResult.Messenger = $"Dữ liệu không hợp lệ";
                        isValid = false;
                    }
                }
                // check trùng dữ liệu
                if (property.IsDefined(typeof(Unique), false))
                {
                    var entityDuplicate = _baseRepository.GetEntityByProperty(entity, property);
                    if (entityDuplicate != null)
                    {
                        messArrError.Add($"Thông tin {displayName} bị trùng");
                        _serviceResult.MISACode = MISACode.NotValid;
                        _serviceResult.Messenger = $"Dữ liệu không hợp lệ";
                        isValid = false;
                    }
                }
            }
            _serviceResult.Data = messArrError;
            return isValid;
        }
    }
}
