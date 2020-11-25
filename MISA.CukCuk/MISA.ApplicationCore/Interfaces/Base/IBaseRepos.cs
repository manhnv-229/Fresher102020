using MISA.ApplicationCore.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces.Base
{
    public interface IBaseRepos<TModel>
    {
        /// <summary>
        /// lấy toàn bộ dữ liệu
        /// </summary>
        /// <returns>toàn bộ dữ liệu, số lượng bản ghi trả về</returns>
        IMethodResult<List<TModel>> GetAll();
        /// <summary>
        /// lấy dữ liệu theo id
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>dữ liệu của object</returns>
        IMethodResult<TModel> GetById(Guid id);
        /// <summary>
        /// Thêm dữ liệu
        /// </summary>
        /// <param name="model">object</param>
        /// <returns>success: true nếu thêm thành công và số lượng bản ghi bị ảnh hưởng</returns>
        IMethodResult Insert(TModel model);
        /// <summary>
        /// sửa dữ liệu
        /// </summary>
        /// <param name="model">object cần sửa</param>
        /// <returns></returns>
        IMethodResult Update(TModel model);
        /// <summary>
        /// xóa dữ liệu
        /// </summary>
        /// <param name="id">id của object</param>
        /// <returns>success: true nếu thành công và số lượng bản ghi bị ảnh hưởng</returns>
        IMethodResult Delete(Guid id);
    }
}
