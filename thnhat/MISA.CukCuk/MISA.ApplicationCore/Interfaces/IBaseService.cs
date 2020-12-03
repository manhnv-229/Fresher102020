using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseService<TEntity>
    {
        public IEnumerable<TEntity> GetEntities();
        ServiceResult Add(TEntity entity);
        ServiceResult Update(TEntity entity);
        ServiceResult Delete(Guid entityId);
    }
}
