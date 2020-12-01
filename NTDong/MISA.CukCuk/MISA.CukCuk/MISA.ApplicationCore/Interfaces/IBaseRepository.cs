using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseRepository<TEntity>
    {
        /// <summary>
        /// Lấy toàn bộ dữ liệu 
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: NTDong(24/11/2020)
        IEnumerable<TEntity> GetEntities();
        int Add(TEntity entity);
        int Update(TEntity entity);
        int Delete(Guid entityID);
        TEntity GetEntityByID(Guid entityID);
        TEntity GetEntityByProperty(TEntity entity ,PropertyInfo property);
    }
}
