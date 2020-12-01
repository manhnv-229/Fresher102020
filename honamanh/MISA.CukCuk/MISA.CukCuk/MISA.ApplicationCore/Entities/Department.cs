using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    public class Department: BaseEntity
    {
        public Guid DepartmentId { get; set; }
        public string DepartmentCode { get; set; }
        public string  DepartmentName { get; set; }
    }
}
