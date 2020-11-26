using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore
{
    public class BaseService<T> : IBaseService<T>
    {
        IBaseRepository<T> _baseRepository;

        #region Constructor
        public BaseService(IBaseRepository<T> baseRepository)
        {
            _baseRepository = baseRepository;
        }
        #endregion

        #region Method
        public IEnumerable<T> GetEntities()
        {
            return _baseRepository.GetEntities();
        }

        public T GetEntityById(string entityId)
        {
            return _baseRepository.GetEntityById(entityId);
        }

        public int Add(T entity)
        {
            return _baseRepository.Add(entity);
        }

        public int Update(T entity)
        {
            return _baseRepository.Update(entity);
        }

        public int Delete(string entityId)
        {
            return _baseRepository.Delete(entityId);
        }
        #endregion
    }
}
