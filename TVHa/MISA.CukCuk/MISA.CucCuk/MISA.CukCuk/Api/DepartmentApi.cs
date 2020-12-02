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
    public class DepartmentApi : ControllerBase
    {
        // GET: api/<DepartmentApi>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<DepartmentApi>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<DepartmentApi>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<DepartmentApi>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DepartmentApi>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
