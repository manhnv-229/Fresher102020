using System;
using System.Collections.Generic;
using System.Text;
using MISA.Entity;

namespace MISA.ApplicationCore.Entities
{
    public class ServiceResult
    {
        public object Data { get; set; }
        public string Messenger { get; set; }
        public MISACode MISACode { get; set; }

    }
}
