using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Infrastructure
{
    public class PositionRepository : BaseRepository<Position>, IPositionRepository
    {
        #region Declare
        #endregion

        public PositionRepository(IConfiguration configuration) : base(configuration)
        {
        }

        #region Method

        #endregion
    }
}
