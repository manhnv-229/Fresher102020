using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entities
{
    [AttributeUsage(AttributeTargets.Property)]
    public class Required : Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class CheckDuplicate : Attribute
    {

    }
    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey : Attribute
    {

    }
    public class BaseEntity
    {
        public EntityState EntityState {get; set;} = EntityState.AddNew;
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}
