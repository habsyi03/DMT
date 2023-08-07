using DMT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMT.Controllers
{
    public class LogTypeController : Controller
    {
        LogTypeModel logTypeModel = new LogTypeModel();
        optLogTypeModel optlogTypeModel = new optLogTypeModel();

        [HttpPost]
        public ActionResult getLogTypeCtrl()
        {
            var data = logTypeModel.getLogTypeMdl();
            return Json(data);
        }

        [HttpPost]
        public ActionResult getOptLogTypeCtrl()
        {
            var data = optlogTypeModel.getOptLogTypeMdl();
            return Json(data);
        }
    }
}