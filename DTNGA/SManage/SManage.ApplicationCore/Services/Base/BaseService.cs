using Dapper;
using MISA_Dictionary_GoodsService.ApplicationCore.Entities;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Entities.Base;
using SManage.ApplicationCore.Enums;
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
        protected readonly IBaseMemoryCache _baseMemoryCache;
        protected readonly IBaseRepository _baseRepository;
        protected ActionServiceResult _actionServiceResult;
        public BaseService(IBaseMemoryCache baseMemoryCache, IBaseRepository baseRepository)
        {
            _baseMemoryCache = baseMemoryCache;
            _baseRepository = baseRepository;
            _actionServiceResult = new ActionServiceResult();
            _actionServiceResult.MISACode = Enums.MISACode.Success;
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

        public async Task<ActionServiceResult> DeleteRangeAsync<T>(List<Guid> entities)
        {
            _actionServiceResult = new ActionServiceResult();
            var entityName = typeof(T).Name;
            var sp = $"Proc_Delete{entityName}By{entityName}Id";
            var listDeleted = new List<T>();
            var failDelete = new List<Guid>();
            for (var i = 0; i < entities.Count; i++)
            {
                var entityId = entities[i];
                var parms = MappingDataTypeForOne($"{entityName}Id", entityId);
                var result = await _baseRepository.DeleteAsync<T>(sp, parms);
                if (result == null)
                {
                    _actionServiceResult.Success = false;
                    _actionServiceResult.MISACode = MISACode.ErrorDeleteEntity;
                    _actionServiceResult.Message = Properties.Resources.ErrorDeleteEntity;
                    failDelete.Add(entityId);
                }
                else
                    listDeleted.Add(result);
            }
            if (failDelete.Count > 0)
            {
                _actionServiceResult.Data = failDelete;
                return _actionServiceResult;
            }
            else
            {
                _actionServiceResult.Data = listDeleted;
                return _actionServiceResult;
            }
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
            var sp = string.Format(ConstProcedure.Proc_GetAlll, entityName);
            return _baseRepository.Get<T>(sp);
        }

        public async Task<List<T>> GetAllAsync<T>()
        {
            var entityName = typeof(T).Name;
            var sp = string.Format(ConstProcedure.Proc_GetAlll, entityName);
            return await _baseRepository.GetAsync<T>(sp);
        }

        public async Task<List<T>> GetByPropertyAsync<T>(string propName, object propValue)
        {
            var entityName = typeof(T).Name;
            var sp = string.Format(ConstProcedure.Proc_GetByProperty, entityName, propName);
            var parms = MappingDataTypeForOne(propName, propValue);
            return await _baseRepository.GetAsync<T>(sp, parms);
        }

        public async Task<T> GetByIdAsync<T>(Guid id)
        {
            var entityName = typeof(T).Name;
            var sp = string.Format(ConstProcedure.Proc_GetById, entityName, entityName);
            var parms = MappingDataTypeForOne($"{entityName}Id", id);
            return await _baseRepository.GetByIdAsync<T>(sp, parms);
        }

        public async Task<PagingData<T>> GetByFilterAsync<T>(Dictionary<string, object> filterValues = null)
        {
            var parms = new DynamicParameters();
            foreach (KeyValuePair<string, object> item in filterValues)
            {
                var key = item.Key;
                var value = item.Value;
                parms.Add(key, value);
            }
            var entityName = typeof(T).Name;
            var sp = string.Format(ConstProcedure.Proc_GetByFilter, entityName);
            return await _baseRepository.GetPagingAsync<T>(sp, parms);
        }
        

        #endregion

        #region Insert
        public virtual async Task<ActionServiceResult> InsertAsync<T>(T entity)
        {
            // Tạo Id mới
            var entityName = entity.GetType().Name;
            var idProp = entity.GetType().GetProperty(entityName + "Id");
            var newId = Guid.NewGuid();
            idProp.SetValue(entity, newId);
            // Kiểm tra hợp lệ
            var isValid = await ValidateAsync<T>(entity);
            if (isValid==false)
            {
                return _actionServiceResult;
            }
            else
            {
                var sp = $"Proc_Insert{entityName}";
                var parms = MappingDataType<T>(entity);
                var result= await _baseRepository.InsertAsync<T>(sp, parms);
                if (result == null)
                {
                    _actionServiceResult.Success = false;
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
        public virtual async Task<ActionServiceResult> UpdateAsync<T>(T entity)
        {
            var isValid = await ValidateAsync<T>(entity);
            if (isValid == false)
                return _actionServiceResult;
            else
            {
                var entityName = entity.GetType().Name;
                var sp = $"Proc_Update{entityName}";
                var parms = MappingDataType<T>(entity);
                var updatedEntity = await _baseRepository.UpdateAsync<T>(sp, parms);
                if (updatedEntity == null)
                {
                    _actionServiceResult.Success = false;
                    _actionServiceResult.MISACode = MISACode.ErrorUpdateEntity;
                    _actionServiceResult.Message = ApplicationCore.Properties.Resources.ErrorUpdateEntity;
                    return _actionServiceResult;
                }
                _actionServiceResult.Data = updatedEntity;
                return _actionServiceResult;
            }

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
                if (prop.IsDefined(typeof(Unduplicated), false) && prop.IsDefined(typeof(PrimaryKey), false) == false)
                {
                    // TODO không check trùng trong trường hợp update và dữ liệu không thay đổi
                    // Check trùng lặp
                    // Lấy entity 
                    var entityDuplicate = await GetByPropertyAsync<T>(propName, propValue);
                    if (entityDuplicate.Count > 0)
                    {
                        isValid = false;
                        _actionServiceResult.Success = false;
                        _actionServiceResult.MISACode = MISACode.Duplicate;
                        _actionServiceResult.Message = Properties.Resources.Duplicate;
                        errorMsg.Add(string.Format(Properties.Resources.DuplicateNotification, displayName));
                    }
                }

            }
            _actionServiceResult.Data = errorMsg;
            return isValid;
        }

        /// <summary>
        /// Custome Validate
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        ///  CreatedBy dtnga (04/12/2020)
        public virtual async Task<bool> CustomeValidateAsync<T>(T entity)
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
            if(typeof(object)== typeof(Guid))
                parms.Add($"{propName}", propValue, DbType.String);
            else
                parms.Add($"{propName}", propValue);
            return parms;
        }
        #endregion
    }
}
