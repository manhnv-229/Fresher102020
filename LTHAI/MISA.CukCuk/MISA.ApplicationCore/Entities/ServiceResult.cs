using MISA.Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    public class ServiceResult
    {
        public object Data { get; set; }

        public string Message { get; set; }
        public MISACode MisaCode { get; set; }

    }
}
