using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity:class
    {
        /// <summary>
        /// Lấy toàn bộ dữ liệu 
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: NTDong(24/11/2020)
        IEnumerable<TEntity> GetEntities();
        TEntity GetEntityById(Guid entityId);
        int Add(TEntity employee);
        int Update(TEntity employee);
        int Delete(Guid employeeId);
        TEntity GetEntityByProperty(TEntity entity, PropertyInfo property);
    }
}
