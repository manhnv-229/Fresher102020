using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Service
{
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity:BaseEntity
    {
        IBaseRepository<TEntity> _baseRepository;
        ServiceResult _serviceResult;
        public BaseService(IBaseRepository<TEntity> baseRepository)
        {
            _baseRepository = baseRepository;
            _serviceResult = new ServiceResult() { MISACode = Enums.MISACode.Success};
        }
        // Thuc hien validate
        public virtual ServiceResult Add(TEntity entity)
        {
            entity.EntityState = Enums.EntityState.AddNew;
            // Thuc hien validate 
            var isValidate = Validate(entity);
            if (isValidate == true)
            {
                _serviceResult.Data = _baseRepository.Add(entity);
                _serviceResult.MISACode = Enums.MISACode.IsValid;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }
        }

        public ServiceResult Delete(Guid entityID)
        {
            _serviceResult.Data = _baseRepository.Delete(entityID);
            return _serviceResult;
        }

        public IEnumerable<TEntity> GetEntities()
        {
            return _baseRepository.GetEntities();
        }

        public TEntity GetEntityByID(Guid entityID)
        {
            return _baseRepository.GetEntityByID(entityID);
        }

        public ServiceResult Update(TEntity entity)
        {
            entity.EntityState = Enums.EntityState.Update;
            var isValidate = Validate(entity);
            if (isValidate == true)
            {
                _serviceResult.Data = _baseRepository.Add(entity);
                _serviceResult.MISACode = Enums.MISACode.IsValid;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }
        }
        private bool Validate(TEntity entity)
        {
            var mesArrayError = new List<string>();
            var isValidate = true;
            var serviceResult = new ServiceResult();
            // Doc cac property
            var properties = entity.GetType().GetProperties();
            foreach (var property in properties)
            {
                // check bat buoc nhap
                var propertyValue = property.GetValue(entity);
                var displayName = string.Empty;
                var displayNameAttributes = property.GetCustomAttributes(typeof(DisplayName), true);
                if (displayNameAttributes.Length > 0 )
                {
                    displayName = (displayNameAttributes[0] as DisplayName).Name;
                }
                // Kiem tra xem co attribute can phai validate khong 
                if (property.IsDefined(typeof(Required), false))
                {
                    if (propertyValue == null)
                    {
                        isValidate = false;
                        mesArrayError.Add($"Thông tin {displayName} không được phép để trống ");
                        serviceResult.MISACode = Enums.MISACode.NotValid;
                        serviceResult.Messenger = "Dữ liệu không hợp lệ";
                    }
                }
                if (property.IsDefined(typeof(MaxLength) , false ))
                {
                    // Lấy độ dài đã khai báo 
                    var attributeMaxlength = property.GetCustomAttributes(typeof(MaxLength) , true)[0];
                    var length = (attributeMaxlength as MaxLength).Value;
                    var msg = (attributeMaxlength as MaxLength).ErrorMsg;
                    if (propertyValue.ToString().Trim().Length > length)
                    {
                        isValidate = false;
                        mesArrayError.Add(msg??$"thông tin này vượt quá {length} cho phép !!! ");
                        serviceResult.MISACode = Enums.MISACode.NotValid;
                        serviceResult.Messenger = "Dữ liệu không hợp lệ ";
                    }
                }
            }
            _serviceResult.Data = mesArrayError;
            return isValidate;
        }
    }
}
