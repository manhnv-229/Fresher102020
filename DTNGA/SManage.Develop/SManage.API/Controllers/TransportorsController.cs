using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Enums;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TransportorsController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly List<ShopTransportor> ShopTransportors;
        private readonly List<Transportor> Transportors;
        public TransportorsController(IBaseMemoryCache baseMemoryCache)
        {
            _baseMemoryCache = baseMemoryCache;
            ShopTransportors = (List<ShopTransportor>)_baseMemoryCache.GetCache("ShopTransportors");
            Transportors= (List<Transportor>)_baseMemoryCache.GetCache("Transportors");
        }

        /// <summary>
        /// Lấy danh sách đơn vị vận chuyển liên kết với cửa hàng
        /// </summary>
        /// <param name="shopId">Id cửa hàng</param>
        /// <returns></returns>
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

    }
}
