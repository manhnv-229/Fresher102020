using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace MISA.ApplicationCore.Interfaces
{
    public interface IBaseRepository<T>
    {
        IEnumerable<T> Get();

        T GetEntityById(string entityId);
        int Insert(T entity);
        int Update(T entity);
        int Delete(string entityId);
        T GetEntityByProperty(T entity, PropertyInfo property);

    }
}
