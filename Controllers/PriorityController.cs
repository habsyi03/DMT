using DMT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMT.Controllers
{
    public class PriorityController : Controller
    {
        PriorityModel priorityModel = new PriorityModel();
        optPriorityModel optpriorityModel = new optPriorityModel();

        [HttpPost]
        public ActionResult getPriority()
        {
            var data = priorityModel.getPriority();
            return Json(data);
        }

        [HttpPost]
        public ActionResult getOptPriority()
        {
            var data = optpriorityModel.getOptPriority();
            return Json(data);
        }
    }
}