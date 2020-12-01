using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.interfaces;
using System;
using System.Collections.Generic;

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
                isValidate = ValidateCustom(entityId);
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
            var mesArrayErro = new List<string>();
            var isValid = true;
            //var serviceResult = new ServiceResult();
            // đọc các properties
            var properties = entity.GetType().GetProperties();

            foreach (var property in properties)
            {
                var propertyValue = property.GetValue(entity);
                var displayName = string.Empty;
                var displayNameAttibutes = property.GetCustomAttributes(typeof(DisplayName), true);
                if (displayNameAttibutes.Length > 0)
                {
                    displayName = (displayNameAttibutes[0] as DisplayName).Name;
                }
                // kiểm tra attribute cần phải validate
                if (property.IsDefined(typeof(Required), false))
                {

                    if (propertyValue == null)
                    {
                        isValid = false;
                        mesArrayErro.Add(string.Format(Properties.Resources.Msg_Emty, displayName));
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                        _serviceResult.Messenger = Properties.Resources.Msg_isNotValid;
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
                        mesArrayErro.Add (string.Format(Properties.Resources.Msg_Duplicate, displayName));
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                        _serviceResult.Messenger = Properties.Resources.Msg_isNotValid;
                    }
                }
                if (property.IsDefined(typeof(MaxLength), false))
                {
                    // lấy độ dài đã khai báo
                    var attributeMaxLength = property.GetCustomAttributes(typeof(MaxLength), true)[0];
                    var length = (attributeMaxLength as MaxLength).Value;
                    var msg = (attributeMaxLength as MaxLength).ErrorMsg;
                    if (propertyValue.ToString().Trim().Length > length)
                    {
                        isValid = false;
                        mesArrayErro.Add(string.Format(Properties.Resources.Msg_Maxlength, displayName, length));
                        _serviceResult.MISACode = Enums.MISACode.NotValid;
                        _serviceResult.Messenger = Properties.Resources.Msg_isNotValid;
                    }
                    
                }
            }
            _serviceResult.Data = mesArrayErro;
            return isValid;
        }
        /// <summary>
        /// hàm thực hiện kiểm tra dữ liệu nghiệp vụ quy trình
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CreatedBy: DVQuang (30/11/2020)
        protected virtual bool ValidateCustom(TEntity entity)
        {
            return true;
        }
    } 
}
