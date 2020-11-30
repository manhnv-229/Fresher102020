using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Entities.Base;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseService<TEntity>
    {
        public IEnumerable<TEntity> GetEntities();
        public TEntity GetEntityById(Guid entityId);
        public ServiceResult InsertEntity(TEntity entity);
        public ServiceResult UpdateEntity(TEntity entity);
        public ServiceResult DeleteEntityById(Guid entityId);
    }
}
