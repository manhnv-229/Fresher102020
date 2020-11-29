using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.interfaces
{
    public interface IBaseRepository<TEntity>
    {
        #region Method Interface
        /// <summary>
        /// lấy danh sách
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: DVQuang (25/11/2020)
        IEnumerable<TEntity> GetEntitis();
        /// <summary>
        /// lấy thông tin theo Id
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: DVQuang (25/11/2020)
        TEntity GetEntityById(Guid entityId);
        /// <summary>
        /// thêm mới
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CreatedBy: DVQuang (25/11/2020)
        int Add(TEntity entity);
        /// <summary>
        /// sửa
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CreatedBy: DVQuang (25/11/2020)
        int Update(TEntity entity);
        /// <summary>
        /// xóa
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        /// CreatedBy: DVQuang (25/11/2020)
        int Delete(Guid entityId);
        /// <summary>
        /// lấy thuộc tính (property của đối tượng)
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="property"></param>
        /// <returns></returns>
        /// CreatedBy: DVQuang (25/11/2020)
        TEntity GetEntityByProperty(TEntity entity, PropertyInfo property);
        #endregion
    }
}
