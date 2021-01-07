using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Enums;
using SManage.ApplicationCore.Interfaces.Service;
using SManage.ApplicationCore.Interfaces.Service.Base;


namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TransportorsController : ControllerBase
    {
        private readonly ITransportorService _transportorService;
        public TransportorsController(ITransportorService transportorService)
        {
            _transportorService = transportorService;
        }


        /// <summary>
        /// Thực hiện tính chi phí vận chuyển
        /// </summary>
        /// <param name="transportorId">Id đơn vị vận chuyển</param>
        /// <param name="shopId">Id cửa hàng</param>
        /// <param name="customerAreaId">Mã đơn vị hành chính của người nhận</param>
        /// <returns>Chi phí vận chuyển</returns>
        /// CreatedBy dtnga /(14/12/2020)
        [HttpGet]
        public async Task<ActionServiceResult> CalculateFeeExpectedDeliveryDateAsync([FromQuery] Guid transportorId, [FromQuery] Guid shopId, [FromQuery] Guid customerAreaId)
        {
            var response = new ActionServiceResult();
            if (transportorId == null || shopId == null || customerAreaId == null)
            {
                response.Success = false;
                response.MISACode = MISACode.NotFound;
                response.Message = ApplicationCore.Properties.Resources.NotFound;
                return response;
            }
            else
            {
                response.Data = await _transportorService.GetTransportData(transportorId, shopId, customerAreaId);
                return response;
            }
                
        }

    }
}
