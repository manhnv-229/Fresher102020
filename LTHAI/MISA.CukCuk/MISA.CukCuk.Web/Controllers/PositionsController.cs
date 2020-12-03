using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interface.ServiceInterface;

namespace MISA.CukCuk.Web.Controllers
{
    /// <summary>
    /// Api danh mục chức vụ
    /// CreatedBy: LTHAI(23/11/2020)
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        #region Attribute
        private readonly IPositionService _positionService;
        #endregion

        #region Contructor
        public PositionsController(IPositionService positionService)
        {
            this._positionService = positionService;
        }
        #endregion

        /// <summary>
        /// Lấy toàn bộ thông tin chức vụ
        /// </summary>
        /// <returns>Danh sách chức vụ</returns>
        /// CreatedBy: LTHAI(3/12/2020)
        [HttpGet]
        public IActionResult Get()
        {
            var positions = _positionService.Gets();
            return Ok(positions);
        }
    }
}
