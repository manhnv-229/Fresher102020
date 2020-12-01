using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class BaseService<T> : IBaseService<T> where T:BaseEntity
    {
        IBaseRepository<T> _baseRepository;
        ServiceResult _serviceResult;

        #region Constructor
        public BaseService(IBaseRepository<T> baseRepository)
        {
            _baseRepository = baseRepository;
            _serviceResult = new ServiceResult() { MISACode = Enums.MISACode.Success };
        }
        #endregion

        #region Method
        public IEnumerable<T> GetEntities()
        {
            return _baseRepository.GetEntities();
        }

        public T GetEntityById(string entityId)
        {
            return _baseRepository.GetEntityById(entityId);
        }

        public virtual ServiceResult Add(T entity)
        {
            entity.EntityState = Enums.EntityState.AddNew;
            //Thực hiện validate:
            var isValidate = Validate(entity);
            if(isValidate == true)
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

        public ServiceResult Update(T entity)
        {
            entity.EntityState = Enums.EntityState.Update;
            //Thực hiện validate:
            var isValidate = Validate(entity);
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

        public ServiceResult Delete(string entityId)
        {
            _serviceResult.Data = _baseRepository.Delete(entityId);
            return _serviceResult;
        }

        private bool Validate(T entity)
        {
            var messError = new List<string>();
            var isValid = true;
            //Đọc các properties:
            var properties = entity.GetType().GetProperties();
            foreach (var property in properties)
            {
                var propertyValue = property.GetValue(entity);
                var displayName = string.Empty;
                var displayNameAttributes = property.GetCustomAttributes(typeof(DisplayName), true);
                //Check nếu cài đặt DisplayName thì lấy ra
                if(displayNameAttributes.Length > 0)
                {
                    displayName = (displayNameAttributes[0] as DisplayName).Name;
                }

                //Kiểm tra xem có attribute cần phải validate không
                if (property.IsDefined(typeof(Required), false))
                {
                    //Check bắt buộc nhập:
                    if(propertyValue == null)
                    {
                        isValid = false;
                        messError.Add($"Thông tin {displayName} không được phép để trống");
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                        _serviceResult.Messenger = "Dữ liệu không hợp lệ";
                    }
                } 
                
                if (property.IsDefined(typeof(CheckDuplicate), false))
                {
                    //Check trùng dữ liệu:
                    var propertyName = property.Name;
                    var entityDuplicate = _baseRepository.GetEntityByProperty(entity, property);
                    if(entityDuplicate != null)
                    {
                        isValid = false;
                        messError.Add($"Thông tin {displayName} đã có trên hệ thống");
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                        _serviceResult.Messenger = "Dữ liệu không hợp lệ";
                    }
                }

                if (property.IsDefined(typeof(MaxLength), false))
                {
                    //Lấy độ dài đã khai báo:
                    var attributeMaxLength = property.GetCustomAttributes(typeof(MaxLength), true)[0];
                    var length = (attributeMaxLength as MaxLength).Length;
                    var msg = (attributeMaxLength as MaxLength).ErrorMsg;
                    if (propertyValue.ToString().Trim().Length > length)
                    {
                        isValid = false;
                        messError.Add(msg??$"Thông tin này vượt quá {length} kí tự cho phép");
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                        _serviceResult.Messenger = "Dữ liệu không hợp lệ";
                    }
                }
            }
            _serviceResult.Data = messError;
            if(isValid == true)
                isValid = CustomValidate(entity);
            return isValid;
        }

        /// <summary>
        /// Hàm thực hiện kiểm tra dữ liệu/nghiệp vụ tùy chỉnh 
        /// </summary>
        /// <returns></returns>
        protected virtual bool CustomValidate(T entity)
        {
            return true;
        }
        #endregion
    }
}
