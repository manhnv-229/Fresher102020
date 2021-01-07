using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SManage.ApplicationCore;
using SManage.ApplicationCore.Entities;
using SManage.ApplicationCore.Enums;
using SManage.ApplicationCore.Properties;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SManage.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AdministrativeAreasController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly List<AdministrativeArea> AdministrativeAreas;

        public AdministrativeAreasController(IBaseMemoryCache baseMemoryCache)
        {
            _baseMemoryCache = baseMemoryCache;
            //Lấy dữ liệu từ cache
            AdministrativeAreas = (List<AdministrativeArea>)_baseMemoryCache.GetCache("AdministrativeAreas");
        }
        /// <summary>
        /// Lấy ra dữ liệu vùng thông qua mã vùng và độ ưu tiên sắp xếp
        /// </summary>
        /// <param name="areaCode">mã vùng</param>
        /// <param name="kind">độ ưu tiên</param>
        /// <returns></returns>
        /// CreatedBy: VDDUNG(19/11/2020)
        [HttpGet("Code")]
        public ActionServiceResult GetAdministrativeAreaByCode([FromQuery] string areaCode, [FromQuery] int kind)
        {
            var response = new ActionServiceResult();
            var listArea = new List<AdministrativeArea>();
            if (kind < 0)
            {
                response = new ActionServiceResult(false, Resources.Validate, MISACode.Validate, null);
                return response;
            }
            // Lấy ra danh sách dữ liệu
            foreach (AdministrativeArea area in AdministrativeAreas)
            {
                // Nếu không nhập mã code thì chỉ hiển thị danh sách các tỉnh
                if (areaCode == null && kind == (int)AreaKind.Province && area.Kind == kind)
                {
                    listArea.Add(area);
                }
                if (areaCode != null && area.AdministrativeAreaCode.StartsWith(areaCode) && area.Kind == kind)
                {
                    listArea.Add(area);
                }
            }
            // Sắp xếp theo mã code
            listArea = listArea.OrderBy(p => Convert.ToInt64(p.AdministrativeAreaCode.Remove(0, (int)LengthOfAreaCode.National))).ToList();
            response.Data = listArea;
            return response;
        }

        /// <summary>
        /// Lấy ra dữ liệu đầy đủ theo mã xã/phường
        /// </summary>
        /// <param name="areaCode">Mã xã/phường</param>
        /// <returns></returns>
        /// CreatedBy dtnga(08/12/2020)
        [HttpGet("FullAddress")]
        public ActionServiceResult GetFullAddressByAreaCode([FromQuery] string areaCode)
        {
            var response = new ActionServiceResult();
            if (String.IsNullOrEmpty(areaCode))
            {
                response.Message = ApplicationCore.Properties.Resources.Value_Empty;
                response.MISACode = MISACode.NotFound;
                return response;
            }
            var fullArea = new FullArea();
            areaCode = areaCode.Trim();
            if (areaCode.Length >=4)
            {
                var provinceCode = areaCode.Substring(0, 4);
                fullArea.Province = AdministrativeAreas.Where<AdministrativeArea>(a => a.AdministrativeAreaCode == provinceCode).FirstOrDefault();
                if (areaCode.Length >= 7)
                {
                    var districtCode = areaCode.Substring(0, 7);
                    fullArea.District = AdministrativeAreas.Where<AdministrativeArea>(a => a.AdministrativeAreaCode == districtCode).FirstOrDefault();
                    if (areaCode.Length >= 12)
                    {
                        var wardCode = areaCode;
                        fullArea.Ward = AdministrativeAreas.Where<AdministrativeArea>(a => a.AdministrativeAreaCode == wardCode).FirstOrDefault();
                    }
                }
            }
            response.Data = fullArea;

            return response;
        }

        /// <summary>
        /// Lấy mã vùng dựa theo Id
        /// </summary>
        /// <param name="administrativeAreaId"></param>
        /// <returns></returns>
        [HttpGet("{administrativeAreaId}")]
        public string GetAreaCodeById([FromRoute] Guid administrativeAreaId)
        {
            var administrativeArea = AdministrativeAreas.Where<AdministrativeArea>(a => a.AdministrativeAreaId == administrativeAreaId).FirstOrDefault();
            if (administrativeArea != null)
                return administrativeArea.AdministrativeAreaCode;
            else return null;
        }
    }
}
