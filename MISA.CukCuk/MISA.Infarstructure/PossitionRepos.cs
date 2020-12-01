using Microsoft.Extensions.Configuration;
using MISA.ApplicationCore.Class;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Infarstructure
{
    public class PossitionRepos :BaseRepos<Possition>
    {
        public PossitionRepos(IConfiguration configuration): base(configuration)
        {

        }
    }
}
