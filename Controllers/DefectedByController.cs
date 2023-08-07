using DMT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMT.Controllers
{
    public class DefectedByController : Controller
    {
        DefectedByModel defectedByModel = new DefectedByModel();

        [HttpPost]
        public ActionResult getDefectedBy()
        {
            var data = defectedByModel.getCreator();
            return Json(data);
        }
    }
}