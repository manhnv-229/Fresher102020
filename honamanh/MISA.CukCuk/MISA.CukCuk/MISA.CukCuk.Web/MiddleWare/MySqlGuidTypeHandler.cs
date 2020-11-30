using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.MiddleWare
{
    public class MySqlGuidTypeHandler : SqlMapper.TypeHandler<Guid>
    {
        public override void SetValue(IDbDataParameter parameter, Guid guid)
        {
            parameter.Value = guid.ToString();
        }

        public override Guid Parse(object value)
        {
            return Guid.Parse(value.ToString());
        }
    }
}
