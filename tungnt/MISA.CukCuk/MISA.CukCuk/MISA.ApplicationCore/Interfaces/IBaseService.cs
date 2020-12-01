using MISA.ApplicationCore.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseService<T>
    {
        IEnumerable<T> Get();
        T GetById(string entityId);
        ServiceResult Insert(T entity);
        ServiceResult Update(T entity);
        ServiceResult Delete(string entityId);
    }
}
