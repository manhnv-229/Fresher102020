using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Enums;
using SManage.ApplicationCore.Interfaces.Service.Base;

namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        protected readonly IBaseService _baseService;

        public ShopsController(IBaseService baseService)
        {
            _baseService = baseService;
        }

        /// <summary>
        /// Lấy thông tin cửa hàng theo Id
        /// </summary>
        /// <param name="shopId">Id cửa hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga (22/12/2020)
        [HttpGet("{shopId}")]
        public async Task<ActionServiceResult> GetByIdAsync([FromRoute] Guid shopId)
        {
            return await _baseService.GetByIdAsync<Shop>(shopId);
        }

        /// <summary>
        /// Lấy danh sách đơn vị vận chuyển liên kết với cửa hàng
        /// </summary>
        /// <param name="shopId">Id cửa hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga /(13/12/2020)
        // GET api/<TransportorsController>/5
        [HttpGet("{shopId}/transportors")]
        public async Task<ActionServiceResult> GetTransportorByShopIdAsync([FromRoute] Guid shopId)
        {
            var response = new ActionServiceResult();
            if (shopId == null)
            {
                response.MISACode = MISACode.NotFound;
                response.Message = ApplicationCore.Properties.Resources.NotFound;
                return response;
            }
            response = await _baseService.GetByPropertyAsync<Transportor>("ShopId", shopId);
            return response;
        }
    }
}
