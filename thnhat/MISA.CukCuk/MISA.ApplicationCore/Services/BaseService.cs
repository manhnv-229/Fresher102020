using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using MISA.Enums;
using System;
using System.Collections.Generic;

namespace MISA.ApplicationCore.Services
{
    public class BaseService<Entity> : IBaseService<Entity>
    {
        IBaseRepository<Entity> _baseRepository;

        public BaseService(IBaseRepository<Entity> baseRepository)
        {
            _baseRepository = baseRepository;
        }
        public virtual ServiceResult Add(Entity entity)
        {
            var serviceResult = new ServiceResult();
            var rowsAffected = _baseRepository.Add(entity);
            serviceResult.MISACode = MISACode.Isvalid;
            serviceResult.Data = rowsAffected;
            serviceResult.Messenger = "Thêm thành công";
            return serviceResult;
        }

        public ServiceResult Delete(Guid entityId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Entity> GetEntities()
        {
            var entities = _baseRepository.GetEntities();
            return (entities);
        }

        public Entity GetEntityById(Guid entityId)
        {
            var entity = _baseRepository.GetEntityById(entityId);
            return (entity);
        }

        public ServiceResult Update(Entity entity)
        {
            throw new NotImplementedException();
        }
    }


}
