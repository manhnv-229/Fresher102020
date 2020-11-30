using MISA.ApplicationCore.Class;
using MISA.ApplicationCore.Entities.Enums;
using MISA.ApplicationCore.Entities.Models;
using MISA.ApplicationCore.Interfaces.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Service
{
    public class BaseService<TModel> : IBaseService<TModel>
    {
        IBaseRepos<TModel> _baseRepos;

        public BaseService(IBaseRepos<TModel> baseRepos)
        {
            _baseRepos = baseRepos;
        }
        #region Method
        /// <summary>
        /// lấy danh sách tất cả bản ghi
        /// </summary>
        /// <returns>MethodResul</returns>
        /// createdBy: tqhuy(24/11/2020)
        public virtual IMethodResult<List<TModel>> GetAll()
        {
            var result = _baseRepos.GetAll();
            if (result.Data != null)
            {
                result.TotalRecord = result.Data.Count;
                result.Status = MISACode.Success;
            }
            else
            {
                result.Message = "Không có dữ liệu";
            }
            return result;

        }
        /// <summary>
        /// lấy bản ghi theo id
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>MethodResul</returns>
        public virtual IMethodResult<TModel> GetById(Guid id)
        {
            var result = _baseRepos.GetById(id);
            if (result.Data != null)
            {
                result.TotalRecord = 1;
                result.Status = MISACode.Success;
            }
            else
            {
                result.Message = "không tìm thấy khách hàng có id: " + id;
            }
            return result;
        }
        /// <summary>
        /// thêm bản ghi
        /// </summary>
        /// <param name="TModel">object</param>
        /// <returns>MethodReult-số bản ghi bị ảnh hưởng</returns>
        /// createdBy: tqhuy(24/11/2020)
        public virtual IMethodResult Insert(TModel TModel)
        {
            var result = _baseRepos.Insert(TModel);
            if (result.TotalRecord != 0)
            {
                result.Message = "Thêm dữ liệu thành công";
                result.Status = MISACode.Success;
            }
            else
            {
                result.Message = "Thêm dữ liệu không thành công!";
            }
            return result;
        }

        public virtual IMethodResult Update(Guid id,TModel tModel)
        {
            tModel.GetType().GetProperty($"{typeof(TModel).Name}ID").SetValue(tModel, id);
            var result = _baseRepos.Update(tModel);
            if(result.TotalRecord == 0)
            {
                result.Message = "update dữ liệu không thành công";                
            }
            else
            {
                result.Message = "Update dữ liệu thành công";
                result.Status = MISACode.Success;
            }
            return result;
        }
        /// <summary>
        /// Xóa bản ghi theo id
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>MethodResult-số bản ghi bị ảnh hưởng</returns>
        /// createdBy: tquy(24/11/2020)
        public virtual IMethodResult Delete(Guid id)
        {
            var result = _baseRepos.Delete(id);
            if (result.TotalRecord == 0)
            {
                result.Message = "Xóa dữ liệu không thành công";

            }
            else
            {
                result.Message = "Xóa dữ liệu thành công";
                result.Status = MISACode.Success;
            }
            return result;
        }

        public bool Validate(TModel model)
        {
            var properties = model.GetType().GetProperties();
            foreach(var property in properties)
            {
                if (property.IsDefined(typeof(Required), false){

                }
            }
        }
        #endregion
    }
}
