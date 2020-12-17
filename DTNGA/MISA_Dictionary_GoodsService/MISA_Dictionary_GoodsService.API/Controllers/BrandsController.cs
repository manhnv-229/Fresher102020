using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA_Dictionary_GoodsService.ApplicationCore;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;

namespace MISA_Dictionary_GoodsService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly IBaseService _baseService;
        protected List<Brand> brands;
        public BrandsController(IBaseMemoryCache baseMemoryCache, IBaseService baseService)
        {
            _baseMemoryCache = baseMemoryCache;
            _baseService = baseService;
            brands = (List<Brand>)_baseMemoryCache.GetCache("Brands");
            if (brands.Count == 0)
            {
                brands = _baseService.GetAll<Brand>();
                _baseMemoryCache.SetCache("Brands", brands);
            }
        }

        /// <summary>
        /// Lấy tất cả thương hiệu
        /// </summary>
        /// <returns></returns>
        /// CreatedBy dtnga (16/12/2020)
        [HttpGet]
        public ActionServiceResult GetAllBrand()
        {
            var response = new ActionServiceResult();
            response.Data = brands;
            return response;
        }

        /// <summary>
        /// Lấy thông tin thương hiệu theo Id
        /// </summary>
        /// <param name="brandId">Id thương hiệu</param>
        /// <returns></returns>
        [HttpGet("{brandId}")]
        public ActionServiceResult GetBrandById([FromRoute] Guid brandId)
        {
            var response = new ActionServiceResult();
            response.Data = brands.Where<Brand>(b => b.BrandId==brandId).FirstOrDefault();
            return response;
        }

        /// <summary>
        /// Thêm thương hiệu mới
        /// </summary>
        /// <param name="newBrand">Thông tin thương hiệu mới</param>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost]
        public async Task<ActionServiceResult> AddNewBrandAsync([FromBody] Brand newBrand)
        {
            var response = await _baseService.InsertAsync<Brand>(newBrand);
            return response;
        }

        /// <summary>
        /// Thêm thương hiệu mới, dữ liệu đọc từ file
        /// </summary>
        /// <param name="file">File chứa thông tin thương hiệu</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost("FromFile")]
        public async Task<ActionServiceResult> AddBrandsFromFileAsync(IFormFile file, CancellationToken cancellationToken)
        {
            var response = new ActionServiceResult();
            return response;
        }

        /// <summary>
        /// Cập nhật thông tin thương hiệu
        /// </summary>
        /// <param name="newBrand"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPut("{id}")]
        public async Task<ActionServiceResult> UpdateBrandAsync([FromBody] Brand newBrand)
        {
            var response = await _baseService.UpdateAsync<Brand>(newBrand);
            return response;
        }

        /// <summary>
        /// Xóa thông tin thương hiêu theo Id
        /// </summary>
        /// <param name="brandId"></param>
        /// <returns></returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpDelete("{brandId}")]
        public async Task<ActionServiceResult> DeleteBrandAsync([FromRoute] Guid brandId)
        {
            var response = await _baseService.DeleteAsync<Brand>(brandId);
            return response;
        }
    }
}
