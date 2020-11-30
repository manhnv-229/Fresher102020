using MISA.ApplicationCore.Entities.Models;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Interfaces.Base
{
    public interface IBaseRepos<TModel>
    {
        /// <summary>
        /// lấy toàn bộ dữ liệu
        /// </summary>
        /// <returns>MethodResult<List<TModel>></returns>
        IMethodResult<List<TModel>> GetAll();
        /// <summary>
        /// lấy dữ liệu theo id
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>MethodResult<TModel></returns>
        IMethodResult<TModel> GetById(Guid id);
        /// <summary>
        /// Thêm dữ liệu
        /// </summary>
        /// <param name="model">object</param>
        /// <returns>MethodResult</returns>
        IMethodResult Insert(TModel model);
        /// <summary>
        /// sửa dữ liệu
        /// </summary>
        /// <param name="model">object cần sửa</param>
        /// <returns>MethodResult</returns>
        IMethodResult Update(TModel model);
        /// <summary>
        /// xóa dữ liệu
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>MethodResult</returns>
        IMethodResult Delete(Guid id);
        /// <summary>
        /// lấy object theo property
        /// </summary>
        /// <param name="propertyInfo"></param>
        /// <returns>TModel</returns>
        TModel GetEntityByProperty(PropertyInfo propertyInfo, TModel model);
    }
}
