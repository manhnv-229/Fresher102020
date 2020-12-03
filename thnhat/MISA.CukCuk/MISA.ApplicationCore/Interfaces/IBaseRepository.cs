using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseRepository<TEntity>
    {
        public IEnumerable<TEntity> GetEntities();
        int Add(TEntity entity);
        int Update(TEntity entity);
        int Delete(Guid entityId);
        TEntity GetEntityByProperty(TEntity entity, PropertyInfo property);
    }
}
