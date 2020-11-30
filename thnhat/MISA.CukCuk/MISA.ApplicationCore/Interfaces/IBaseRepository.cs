using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseRepository<TEntity>
    {
        public IEnumerable<TEntity> GetEntities();
        TEntity GetEntityById(Guid entityId);
        int Add(TEntity entity);
        int Update(TEntity entity);
        int Delete(Guid entityId);
    }
}
