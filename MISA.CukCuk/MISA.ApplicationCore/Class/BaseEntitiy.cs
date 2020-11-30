using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Class
{
    [AttributeUsage(AttributeTargets.Property)]
    public class Required: Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class CheckDuplicate: Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey: Attribute
    {

    }
    public class BaseEntitiy
    {
        public DateTime? CreatedDate { get; set; }
        public String CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public String ModifiedNy { get; set; }
    }
}
