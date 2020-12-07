using Dapper;
using SManage.ApplicationCore.Entities.Base;
using SManage.ApplicationCore.Interfaces.Repositories;
using SManage.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace SManage.ApplicationCore.Services
{
    public class BaseService : IBaseService
    {
        private readonly IBaseRepository _baseRepository;
        ActionServiceResult _actionServiceResult;
        public BaseService(IBaseRepository baseRepository)
        {
            _baseRepository = baseRepository;
            _actionServiceResult = new ActionServiceResult();
            _actionServiceResult.MISACode = Enums.MISACode.Success;
        }

        #region Delete
        public async Task<T> DeleteAsync<T>(T entity)
        {
            var entityName = entity.GetType().Name;
            var sp = $"Proc_Delete{entityName}By{entityName}Id";
            var parms = MappingDataType<T>(entity);
            return await _baseRepository.DeleteAsync<T>(sp, parms);
        }

        public async Task<int> DeleteRangeAsync<T>(List<object> entities)
        {
            var entityName = typeof(T).GetType().Name;
            var sp = $"Proc_Delete{entityName}By{entityName}Id";
            return await _baseRepository.DeleteRangeAsync<T>(sp, entities);
        }
        #endregion

        #region Execute
        public async Task<int> ExecuteAsync(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            return await _baseRepository.ExecuteAsync(sp, parms);
        }
        #endregion

        #region Get
        public async Task<List<T>> GetAllAsync<T>()
        {
            var entityName = typeof(T).GetType().Name;
            var sp = $"Proc_Get{entityName}";
            return await _baseRepository.GetAllAsync<T>(sp);
        }

        public async Task<T> GetByPropertyAsync<T>(string propName, T entity)
        {
            var propValue = entity.GetType().GetProperty(propName);
            var sp = $"Proc_Get{entity.GetType().Name}By{propName}";
            var parms = MappingDataType<T>(entity);
            return await _baseRepository.GetAsync<T>(sp, parms);
        }

        public async Task<T> GetByIdAsync<T>(T entity)
        {
            var entityName = entity.GetType().Name;
            var sp = $"Proc_Get{entityName}By{entityName}Id";
            var parms = MappingDataType<T>(entity);
            return await _baseRepository.GetByIdAsync<T>(sp, parms);
        }
        #endregion

        #region Insert
        public async Task<ActionServiceResult> InsertAsync<T>(T entity)
        {
            var isValid = await ValidateAsync<T>(entity);
            if (isValid==false)
            {
                return _actionServiceResult;
            }
            else
            {
                var entityName = entity.GetType().Name;
                var sp = $"Proc_Insert{entityName}";
                var parms = MappingDataType<T>(entity);
                var result= await _baseRepository.InsertAsync<T>(sp, parms);
                if( result != null)
                {
                    _actionServiceResult.Data = result;
                    _actionServiceResult.Message = Properties.Resources.Success;
                }
                return _actionServiceResult;
            }

        }

        //TODO thêm list object
        public async Task<int> InsertRangeAsync<T>(List<object> entities)
        {
            var entityName = typeof(T).GetType().Name;
            var sp = $"Proc_Insert{entityName}";
            return await _baseRepository.InsertRangeAsync<T>(sp, entities);
        }
        #endregion

        #region Update
        public async Task<T> UpdateAsync<T>(T entity)
        {
            var entityName = entity.GetType().Name;
            var sp = $"Proc_Update{entityName}";
            var parms = MappingDataType<T>(entity);
            return await _baseRepository.UpdateAsync<T>(sp, parms);
        }

        //TODO Update list object
        public async Task<int> UpdateRangeAsync<T>(List<object> entities)
        {
            var entityName = typeof(T).GetType().Name;
            var sp = $"Proc_Update{entityName}";
            return await _baseRepository.UpdateRangeAsync<T>(sp, entities);
        }
        #endregion

        /// <summary>
        /// Thực hiện validate dữ liệu trước khi thêm, sửa trong DB
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (04/12/2020)
        protected async Task<bool> ValidateAsync<T>(T entity)
        {
            var isValid = true;
            // Đọc các propperty
            var properties = entity.GetType().GetProperties();
            foreach (var prop in properties)
            {
                var errorMsg = new List<string>();
                // Lấy tên hiển thị của property
                var displayNameAttribute = prop.GetCustomAttributes(typeof(DisplayName), true)[0];
                var displayName = (displayNameAttribute as DisplayName).name;
                var propValue = prop.GetValue(entity);
                var propName = prop.Name;
                // Kiểm tra property có Attribute cần validate không
                if (prop.IsDefined(typeof(Required), false))
                {
                    // Check bắt buộc nhập
                    if (propValue == null)
                    {
                        isValid = false;
                        errorMsg.Add(string.Format(Properties.Resources.Required, displayName));
                        _actionServiceResult.MISACode = Enums.MISACode.ValidateEntity;
                        _actionServiceResult.Message = Properties.Resources.ValidateEntity;
                    }
                }
                if (prop.IsDefined(typeof(Unduplicated), false))
                {
                    // Check trùng lặp
                    // Lấy entity 
                    var entityDuplicate = await GetByPropertyAsync<T>(propName, entity);
                    if (entityDuplicate != null)
                    {
                        isValid = false;
                        errorMsg.Add(string.Format(Properties.Resources.Duplicate, displayName));
                        _actionServiceResult.MISACode = Enums.MISACode.ValidateEntity;
                        _actionServiceResult.Message = Properties.Resources.ValidateEntity;
                    }
                }
                if (prop.IsDefined(typeof(MaxLength), false))
                {
                    // Lấy ra attribute của property
                    var attributeMaxLength = prop.GetCustomAttributes(typeof(MaxLength), true)[0];
                    var maxLength = (attributeMaxLength as MaxLength).maxLength;
                    var msg = (attributeMaxLength as MaxLength).errorMsg;
                    if (propValue.ToString().Trim().Length > maxLength)
                    {
                        isValid = false;
                        if (msg == null) errorMsg.Add(string.Format(Properties.Resources.MaxLength, displayName, maxLength));
                        errorMsg.Add(msg);
                        _actionServiceResult.MISACode = Enums.MISACode.ValidateEntity;
                        _actionServiceResult.Message = Properties.Resources.ValidateEntity;
                    }
                }
                _actionServiceResult.Data = errorMsg;
            }
            return isValid;
        }

        /// <summary>
        /// Thực hiện mapping kiểu dữ liệu
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity">Đối tượng cần mapping</param>
        /// <returns>Tập tham số DynamicParameters</returns>
        /// CreatedBy dtnga (04/12/2020)
        protected DynamicParameters MappingDataType<T>(T entity)
        {
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                    parameters.Add($"@{propertyName}", propertyValue, DbType.String);
                else
                    parameters.Add($"@{propertyName}", propertyValue);
            }
            return parameters;
        }

        public async Task<bool> CustomeValidateAsync<T>(T entity)
        {
            return await ValidateAsync<T>(entity);
        }
    }
}
