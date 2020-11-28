using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    


    public class BaseService<TEntity> : IBaseService<TEntity>
    {
        #region Delarce
        IBaseRepository<TEntity> _baseRepository;
        #endregion

        #region Constructor
        public BaseService(IBaseRepository<TEntity> baseRepository)
        {
            _baseRepository = baseRepository;
        }
        #endregion
        #region Method

        public int AddEntity(TEntity entity)
        {
            var rowAffects = _baseRepository.AddEntity(entity);
            return rowAffects;
        }

        public int DeleteEntity(string entityId)
        {
            var rowAffects = _baseRepository.DeleteEntity(entityId);
            return rowAffects;
        }

        public TEntity GetEntityById(string entityId)
        {
            var entity = _baseRepository.GetEntityById(entityId);
            return entity;
        }

        public IEnumerable<TEntity> GetTEntites()
        {
            var entities = _baseRepository.GetTEntites();
            return entities;
        }

        public TEntity UpdateEntity(TEntity entity)
        {
            throw new NotImplementedException();
        }
        #endregion

    }
}
