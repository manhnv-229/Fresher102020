using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IRepository<TEntity>
    {
        public IEnumerable<TEntity> GetEntities();
        public TEntity GetEntityById(Guid entityId);
        public int InsertEntity(TEntity entity);
        public int UpdateEntity(TEntity entity);
        public int DeleteEntityById(Guid entityId);
        public TEntity GetEntityByProperty(TEntity entity, PropertyInfo property);
    }
}
