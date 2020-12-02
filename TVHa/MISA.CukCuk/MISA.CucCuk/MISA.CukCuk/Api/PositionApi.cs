using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Interfaces;
using MISA.Common.Models;

namespace MISA.CukCuk.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionApi : ControllerBase
    {
        // GET: api/<PositionApi>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PositionApi>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PositionApi>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PositionApi>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PositionApi>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
