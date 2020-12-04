﻿using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Controllers
{
    public class GendersController : BaseController<Gender>
    {
        
        public GendersController(IBaseService<Gender> baseService) : base(baseService)
        {
        }
    }
}
