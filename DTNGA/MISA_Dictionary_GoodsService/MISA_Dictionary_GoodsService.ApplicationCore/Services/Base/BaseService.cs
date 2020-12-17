using Dapper;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Repositories;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace MISA_Dictionary_GoodsService.ApplicationCore.Services
{
    public class BaseService : IBaseService
    {
        private readonly IBaseRepository _baseRepository;
        ActionServiceResult _actionServiceResult;
        public BaseService(IBaseRepository baseRepository)
        {
            _baseRepository = baseRepository;
            _actionServiceResult = new ActionServiceResult();
            _actionServiceResult.MISACode = MISACode.Success;
        }

        #region Delete
        public async Task<ActionServiceResult> DeleteAsync<T>(Guid entityId)
        {
            var entityName = typeof(T).Name;
            // Kiểm tra tồn tại trên hệ thống hay không
            var existed = await CheckExist<T>(entityId);
            if (existed)
            {
                var sp = $"Proc_Delete{entityName}By{entityName}Id";
                var parms = MappingDataTypeForOne(entityName + "Id", entityId);
                var result = await _baseRepository.DeleteAsync<T>(sp, parms);
                if (result == null)
                {
                    _actionServiceResult.MISACode = MISACode.ErrorDeleteEntity;
                    _actionServiceResult.Message = ApplicationCore.Properties.Resources.ErrorDeleteEntity;
                    return _actionServiceResult;
                }
                _actionServiceResult.Data = result;
            }
            return _actionServiceResult;
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
        public List<T> GetAll<T>()
        {
            var entityName = typeof(T).Name;
            var sp = $"Proc_GetAll{entityName}";
            return _baseRepository.GetAll<T>(sp);
        }

        public async Task<List<T>> GetAllAsync<T>()
        {
            var entityName = typeof(T).Name;
            var sp = $"Proc_GetAll{entityName}";
            return await _baseRepository.GetAllAsync<T>(sp);
        }

        public async Task<T> GetByPropertyAsync<T>(string propName, object propValue)
        {
            var entityName = typeof(T).Name;
            var sp = $"Proc_Get{entityName}By{propName}";
            var parms = MappingDataTypeForOne(propName, propValue);
            return await _baseRepository.GetAsync<T>(sp, parms);
        }

        public async Task<T> GetByIdAsync<T>(Guid id)
        {
            var entityName = typeof(T).Name;
            var sp = $"Proc_Get{entityName}By{entityName}Id";
            var parms = MappingDataTypeForOne(entityName + "Id", id);
            return await _baseRepository.GetByIdAsync<T>(sp, parms);
        }
        #endregion

        #region Insert
        public async Task<ActionServiceResult> InsertAsync<T>(T entity)
        {
            var isValid = await ValidateAsync<T>(entity);
            if (isValid == false)
            {
                return _actionServiceResult;
            }
            else
            {
                var entityName = entity.GetType().Name;
                var sp = $"Proc_Insert{entityName}";
                var parms = MappingDataType<T>(entity);
                var result = await _baseRepository.InsertAsync<T>(sp, parms);
                if (result == null)
                {
                    _actionServiceResult.MISACode = MISACode.ErrorAddEntity;
                    _actionServiceResult.Message = ApplicationCore.Properties.Resources.ErrorAddEntity;
                    return _actionServiceResult;
                }
                _actionServiceResult.Data = result;
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
        public async Task<ActionServiceResult> UpdateAsync<T>(T entity)
        {
            var entityName = entity.GetType().Name;
            var sp = $"Proc_Update{entityName}";
            var parms = MappingDataType<T>(entity);
            var updatedEntity = await _baseRepository.UpdateAsync<T>(sp, parms);
            if (updatedEntity == null)
            {
                _actionServiceResult.MISACode = MISACode.ErrorDeleteEntity;
                _actionServiceResult.Message = ApplicationCore.Properties.Resources.ErrorDeleteEntity;
            }
            _actionServiceResult.Data = updatedEntity;
            return _actionServiceResult;
        }

        //TODO Update list object
        public async Task<int> UpdateRangeAsync<T>(List<object> entities)
        {
            var entityName = typeof(T).GetType().Name;
            var sp = $"Proc_Update{entityName}";
            return await _baseRepository.UpdateRangeAsync<T>(sp, entities);
        }
        #endregion

        #region Validate
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
            var errorMsg = new List<string>();
            foreach (var prop in properties)
            {
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
                        _actionServiceResult.MISACode = MISACode.ValidateEntity;
                        _actionServiceResult.Message = Properties.Resources.ValidateEntity;
                    }
                }
                if (prop.IsDefined(typeof(Unduplicated), false))
                {
                    // Check trùng lặp
                    // Lấy entity 
                    var entityDuplicate = await GetByPropertyAsync<T>(propName, propValue);
                    if (entityDuplicate != null)
                    {
                        isValid = false;
                        errorMsg.Add(string.Format(Properties.Resources.Duplicate, displayName));
                        _actionServiceResult.MISACode = MISACode.ValidateEntity;
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
                        _actionServiceResult.MISACode = MISACode.ValidateEntity;
                        _actionServiceResult.Message = Properties.Resources.ValidateEntity;
                    }
                }
            }
            _actionServiceResult.Data = errorMsg;
            return isValid;
        }

        public async Task<bool> CustomeValidateAsync<T>(T entity)
        {
            return await ValidateAsync<T>(entity);
        }

        /// <summary>
        /// Kiểm tra entity có tồn tại trên hệ thống hay chưa
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entityId"></param>
        /// <returns>true nếu đã tồn tại, false nếu không tồn tại</returns>
        /// CreatedBy dtnga (17/12/2020)
        public async Task<bool> CheckExist<T>(Guid entityId)
        {
            var result = true;
            var entity = await GetByIdAsync<T>(entityId);
            if (entity == null)
            {
                _actionServiceResult.MISACode = MISACode.ValidateEntity;
                _actionServiceResult.Message = ApplicationCore.Properties.Resources.ValueEntity;
                result = false;
            }
            return result;
        }
        #endregion

        #region Mapping dataType
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

        /// <summary>
        /// Thực hiện mapping kiểu dữ liệu cho 1 property
        /// </summary>
        /// <param name="propName"></param>
        /// <param name="propValue"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (04/12/2020)
        protected DynamicParameters MappingDataTypeForOne(string propName, object propValue)
        {
            var parms = new DynamicParameters();
            if (typeof(object) == typeof(Guid))
                parms.Add($"{propName}", propValue, DbType.String);
            else
                parms.Add($"{propName}", propValue);
            return parms;
        }
        #endregion

    }
}
