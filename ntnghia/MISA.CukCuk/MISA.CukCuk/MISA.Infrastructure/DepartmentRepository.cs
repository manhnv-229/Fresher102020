using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Infrastructure
{
    public class DepartmentRepository : BaseRepository<Department>, IDepartmentRepository
    {
        #region Declare
        #endregion

        public DepartmentRepository(IConfiguration configuration) : base(configuration)
        {
        }

        #region Method

        #endregion
    }
}
