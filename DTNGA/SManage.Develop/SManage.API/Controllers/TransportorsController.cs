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
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly IBaseService _baseService;
        private readonly List<ShopTransportor> ShopTransportors;
        private readonly List<Transportor> Transportors;
        public TransportorsController(IBaseMemoryCache baseMemoryCache, IBaseService baseService)
        {
            _baseMemoryCache = baseMemoryCache;
            _baseService = baseService;
            ShopTransportors = (List<ShopTransportor>)_baseMemoryCache.GetCache("ShopTransportors");
            Transportors= (List<Transportor>)_baseMemoryCache.GetCache("Transportors");
        }


        /// <summary>
        /// Lấy danh sách đơn vị vận chuyển liên kết với cửa hàng
        /// </summary>
        /// <param name="shopId">Id cửa hàng</param>
        /// <returns></returns>
        /// CreatedBy dtnga /(13/12/2020)
        // GET api/<TransportorsController>/5
        [HttpGet("{shopId}")]
        public ActionServiceResult Get([FromRoute] Guid shopId)
        {
            var response = new ActionServiceResult();
            if (shopId == null)
            {
                response.MISACode = MISACode.NotFound;
                response.Message = ApplicationCore.Properties.Resources.NotFound;
                return response;
            }
            var data = new List<Transportor>();
            var listTransportor = ShopTransportors.Where<ShopTransportor>(t=> t.ShopId==shopId).ToList();
            // Lấy thông tin chi tiết đơn vị vận chuyển
            listTransportor.ForEach(trans =>
            {
                var transportorId = trans.TransportorId;
                var transportor = (Transportor) Transportors.Where<Transportor>(t => t.TransportorId == transportorId).FirstOrDefault();
                if (transportor != null)
                    data.Add(transportor);
            });
           
            if (data.Count == 0)
            {
                response.MISACode = MISACode.NotFound;
                response.Message = ApplicationCore.Properties.Resources.NotFound;
                return response;
            }
            response.Data = data;
            response.MISACode = MISACode.Success;
            response.Message = ApplicationCore.Properties.Resources.Success;
            return response;
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
            var trans = await _baseService.GetByIdAsync<Transportor>(transportorId);
            // Lấy thông tin mã địa bàn hành chính của cửa hàng
            var shop = await _baseService.GetByIdAsync<Shop>(shopId);
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
            var trans = await _baseService.GetByIdAsync<Transportor>(transportorId);
            // Lấy thông tin mã địa bàn hành chính của cửa hàng
            var shop = await _baseService.GetByIdAsync<Shop>(shopId);
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
