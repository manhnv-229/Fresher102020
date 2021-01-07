using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA_Dictionary_GoodsService.ApplicationCore;
using MISA_Dictionary_GoodsService.ApplicationCore.Const;
using MISA_Dictionary_GoodsService.ApplicationCore.Entities.DTO.Brand;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service;
using MISA_Dictionary_GoodsService.ApplicationCore.Interfaces.Service.Base;
using Newtonsoft.Json.Linq;

namespace MISA_Dictionary_GoodsService.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBaseMemoryCache _baseMemoryCache;
        private readonly IBrandService _brandService;
        public BrandsController(IBaseMemoryCache baseMemoryCache, IBrandService brandService)
        {
            _baseMemoryCache = baseMemoryCache;
            _brandService = brandService;

        }

        /// <summary>
        /// Lấy thông tin thương hiệu theo bộ lọc và tìm kiếm
        /// </summary>
        /// <param name="size">Số bản ghi trên trang</param>
        /// <param name="page">Số thứ tự trang</param>
        /// <param name="keyWord">key tìm kiếm</param>
        /// <param name="brandOrigin">Xuất xứ thương hiệu</param>
        /// <returns>Danh sách thương hiệu trên trang cần lấy và tổng số bản ghi thỏa mãn</returns>
        /// CreatedBy dtnga (24/12/2020)
        [HttpGet]
        public async Task<IActionResult> GetByFilterAsync([FromQuery] int size, [FromQuery] int page, [FromQuery] string keyWord, [FromQuery] string brandOrigin)
        {
            try
            {
                var filterValues = new Dictionary<string, object>
            {
                { ConstParameter.PageIndex, page },
                { ConstParameter.PageSize, size },
                { ConstParameter.KeyWord, keyWord },
                { ConstParameter.BrandOrigin, brandOrigin }
            };
                var pagingData = await _brandService.GetPagingByFilterAsync<Brand>(filterValues);
                return Ok(pagingData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

        /// <summary>
        /// Kiểm tra trùng lặp dữ liệu
        /// </summary>
        /// <param name="key">Khóa kiểm tra</param>
        /// <param name="value">Giá trị cần kiểm tra</param>
        /// <returns></returns>
        /// CreatedBy dtnga (30/12/2020)
        [HttpGet("duplication")]
        public async Task<IActionResult> CheckDuplicate([FromQuery] string key, [FromQuery] string value)
        {
            try
            {
                if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(value)) return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
                bool duplicate = false;
                if (string.IsNullOrEmpty(key) || string.IsNullOrEmpty(value) || value.Length > 20) return StatusCode(400, ApplicationCore.Properties.Resources.Validate);
                var result = new Brand();
                if (key == ConstParameter.BrandName)
                    result = (await _brandService.GetByPropertyAsync<Brand>(ConstParameter.BrandName, value)).FirstOrDefault();
                else if (key == ConstParameter.BrandCode)
                    result = (await _brandService.GetByPropertyAsync<Brand>(ConstParameter.BrandCode, value)).FirstOrDefault();
                if (result != null)
                    duplicate = true;
                return StatusCode(200, duplicate);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

        /// <summary>
        /// Lấy tất cả thương hiệu
        /// </summary>
        /// <returns>danh sách thương hiệu</returns>
        /// CreatedBy dtnga (16/12/2020)
        [HttpGet("all")]
        public async Task<IActionResult> GetAllBrandAsync()
        {
            try
            {
                var brands = await _brandService.GetAllAsync<Brand>();
                return Ok(brands);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

        /// <summary>
        /// Lấy tên tất cả xuất xứ thương hiệu
        /// </summary>
        /// <returns>Tên tất cả xuất xứ thương hiệu</returns>
        /// CreatedBy dtnga (27/12/2020)
        [HttpGet("origin")]
        public async Task<IActionResult> GetAllOriginAsync()
        {
            try
            {
                var origins = await _brandService.GetBrandOrigin();
                return Ok(origins);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

        /// <summary>
        /// Lấy thông tin thương hiệu theo Id
        /// </summary>
        /// <param name="brandId">Id thương hiệu</param>
        /// <returns>Thông tin thương hiệu theo Id</returns>
        [HttpGet("{brandId}")]
        public async Task<IActionResult> GetBrandByIdAsync([FromRoute] Guid brandId)
        {
            try
            {
                if (brandId == null) return StatusCode(400, ApplicationCore.Properties.Resources.EmptyInput);
                var brand = _baseMemoryCache.GetCache<Brand>(brandId.ToString());
                if (brand == null)
                {
                    brand = await _brandService.GetByIdAsync<Brand>(brandId);
                    _baseMemoryCache.SetCache(brandId.ToString(), brand);
                }
                return Ok(brand);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }

        /// <summary>
        /// Thêm thương hiệu mới
        /// </summary>
        /// <param name="newBrand">Thông tin thương hiệu mới</param>
        /// <returns>Id thương hiệu thêm thành công</returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPost]
        public async Task<IActionResult> AddNewBrandAsync([FromBody] BrandCreateDTO newBrand)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                var brand = Brand.ConvertFromCreateDTO(newBrand);
                brand.BrandId = Guid.NewGuid();
                var response = await _brandService.InsertAsync<Brand>(brand);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return StatusCode(201, brand.BrandId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }


        /// <summary>
        /// Cập nhật thông tin thương hiệu
        /// </summary>
        /// <param name="newBrand"></param>
        /// <returns>Id thương hiệu cập nhật thành công </returns>
        /// CreatedBy dtnga (17/12/2020)
        [HttpPut]
        public async Task<IActionResult> UpdateBrandAsync([FromBody] BrandUpdateDTO newBrand)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return StatusCode(400, ModelState);
                }
                var brand = Brand.ConvertFromUpdateDTO(newBrand);
                var response = await _brandService.UpdateAsync<Brand>(brand);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return StatusCode(200, brand.BrandId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }


        /// <summary>
        /// Thực hiện xóa nhiều thương hiệu
        /// </summary>
        /// <param name="range">danh sách chứa Id các thương hiệu cần xóa</param>
        /// <returns></returns>
        /// CreatedBy dtnga (23/12/2020)
        [HttpDelete]
        public async Task<IActionResult> DeleteRangeAsync([FromBody] List<Guid> range)
        {
            try
            {
                if (range.Count == 0) return StatusCode(400, string.Format(ApplicationCore.Properties.Resources.EmptyInput, "Id thương hiệu"));
                var response = await _brandService.DeleteRangeAsync<Brand>(range);
                if (response.Success == false)
                    return StatusCode(400, response);
                else
                    return Ok(range);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApplicationCore.Properties.Resources.Exception);
            }
        }
    }
}
