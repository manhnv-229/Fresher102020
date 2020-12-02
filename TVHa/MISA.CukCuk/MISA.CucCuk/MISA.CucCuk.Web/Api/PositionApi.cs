using Microsoft.AspNetCore.Mvc;
using MISA.Common.Models;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CucCuk.Web.Api
{
    [Route("api/v1/positions")]
    [ApiController]
    public class PositionApi : BaseApi<Position>
    {
        IBaseService<Position> _positionService;
        public PositionApi(IBaseService<Position> positionService) : base(positionService)
        {
            _positionService = positionService;
        }
    }
}