using MISA.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Infrastructure.Repository
{
    public class BaseRepository<T> : IBaseRepository<T>
    {
        #region Property
        protected IDatabaseContext<T> _databaseContext;
        #endregion Property
        #region Constructor
        public BaseRepository(IDatabaseContext<T> databaseContext)
        {
            _databaseContext = databaseContext;
        }
        #endregion Constructor
        #region Method
        public IEnumerable<T> GetData()
        {
            return _databaseContext.GetData();
        }

        public IEnumerable<T> GetDataByPage(int page, int record)
        {
            return _databaseContext.GetDataByPage(page, record);
        }

        public T GetById(object recordId)
        {
            return _databaseContext.GetById(recordId);
        }

        public int Insert(T obj)
        {
            return _databaseContext.Insert(obj);
        }

        public int Update(T obj)
        {
            return _databaseContext.Update(obj);
        }

        public int Delete(Guid recordId)
        {
            return _databaseContext.Delete(recordId);
        }
        #endregion Method
    }
}