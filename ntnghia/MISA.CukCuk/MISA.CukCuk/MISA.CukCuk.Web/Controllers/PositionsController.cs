using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;

namespace MISA.CukCuk.Web.Controllers
{

    public class PositionsController : BaseApiController<Position>
    {
        IPositionService _positionService;

        #region Constructor
        public PositionsController(IPositionService positionService) : base(positionService)
        {
            _positionService = positionService;
        }
        #endregion
    }
}