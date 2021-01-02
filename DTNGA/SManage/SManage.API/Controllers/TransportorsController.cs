using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Enums;
using SManage.ApplicationCore.Interfaces.Service.Base;


namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TransportorsController : ControllerBase
    {
        private readonly IBaseService _baseService;
        public TransportorsController(IBaseService baseService)
        {
            _baseService = baseService;
        }

        

        /// <summary>
        /// Thực hiện tính chi phí vận chuyển
        /// </summary>
        /// <param name="transportorId">Id đơn vị vận chuyển</param>
        /// <param name="shopId">Id cửa hàng</param>
        /// <param name="customerAreaCode">Mã đơn vị hành chính của người nhận</param>
        /// <returns>Chi phí vận chuyển</returns>
        /// CreatedBy dtnga /(14/12/2020)
        [HttpGet("Fee")]
        public async Task<ActionServiceResult> CalculateShippingFeeAsync([FromQuery] Guid transportorId, [FromQuery] Guid shopId, [FromQuery] string customerAreaCode)
        {
            var response = new ActionServiceResult();
            if (transportorId == null || shopId == null || customerAreaCode == null)
            {
                response.Success = false;
                response.MISACode = MISACode.NotFound;
                response.Message = ApplicationCore.Properties.Resources.NotFound;
                return response;
            }
            
            // Lấy thông tin chi tiết của đơn vị vận chuyển
            var trans = (Transportor) (await _baseService.GetByIdAsync<Transportor>(transportorId)).Data;
            // Lấy thông tin mã địa bàn hành chính của cửa hàng
            var shop = (Shop) (await _baseService.GetByIdAsync<Shop>(shopId)).Data;
            var shopAreaCode = shop.AdministrativeAreaCode;
            double fee = 0;
            if(shopAreaCode.Substring(0, 4) == customerAreaCode.Substring(0, 4))
                fee = trans.InnerFee;
            else
                fee = trans.OutsideFee;
            response.Data = fee;
            return response;
        }

        /// <summary>
        /// Thực hiện tính ngày nhận hàng dự kiến
        /// </summary>
        /// <param name="transportorId">Id đơn vị vận chuyển</param>
        /// <param name="shopId">Id cửa hàng</param>
        /// <param name="customerAreaCode">Mã đơn vị hành chính của người nhận</param>
        /// <returns>Chi phí vận chuyển</returns>
        /// CreatedBy dtnga /(14/12/2020)
        [HttpGet("ExpectedDeliveryDate")]
        public async Task<ActionServiceResult> CalcExpectedDeliveryDateAsync([FromQuery] Guid transportorId, [FromQuery] Guid shopId, [FromQuery] string customerAreaCode)
        {
            var response = new ActionServiceResult();
            if (transportorId == null || shopId == null || customerAreaCode == null)
            {
                response.Success = false;
                response.MISACode = MISACode.NotFound;
                response.Message = ApplicationCore.Properties.Resources.NotFound;
                return response;
            }
            // Lấy thông tin chi tiết của đơn vị vận chuyển
            var trans =(Transportor) (await _baseService.GetByIdAsync<Transportor>(transportorId)).Data;
            // Lấy thông tin mã địa bàn hành chính của cửa hàng
            var shop = (Shop)(await _baseService.GetByIdAsync<Shop>(shopId)).Data;
            var shopAreaCode = shop.AdministrativeAreaCode;
            var expectedDeliveryDate = DateTime.Now;
            if (shopAreaCode.Substring(0, 4) == customerAreaCode.Substring(0, 4))
                expectedDeliveryDate = expectedDeliveryDate.AddDays(trans.InnerDeliveryTime);
            else
                expectedDeliveryDate = expectedDeliveryDate.AddDays(trans.OutsideDeliveryTime);
            response.Data = expectedDeliveryDate;
            return response;
        }

    }
}
