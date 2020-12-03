using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/enums")]
    [ApiController]
    public class EnumsController : ControllerBase
    {
        [HttpGet("gender")]
        public IActionResult GetEnums()
        {
            var values = Enum.GetValues(typeof(Gender)).Cast<Gender>();
            var genders = new List<object>();
            foreach (var item in values)
            {
                var enumName = item.ToString();
                var enumText = MISA.ApplicationCore.Properties.Resources.ResourceManager.GetString($"Enum_Gender_{enumName}");
                genders.Add(new
                {
                    text = enumText,
                    value = (int)item
                });
            }
            return Ok(genders);
        }
    }
}
