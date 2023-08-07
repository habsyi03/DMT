using DMT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMT.Controllers
{
    public class StatusController : Controller
    {
        StatusModel statusModel = new StatusModel();
        optStatusModel optstatusModel = new optStatusModel();

        [HttpPost]
        public ActionResult getStatus()
        {
            var data = statusModel.getStatus();
            return Json(data);
        }

        [HttpPost]
        public ActionResult getOptStatus()
        {
            var data = optstatusModel.getOptStatus();
            return Json(data);
        }
    }
}