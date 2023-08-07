using DMT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMT.Controllers
{
    public class DefectHistoryController : Controller
    {
        DefectHistoryModel defecthistorymodel = new DefectHistoryModel();

        [HttpPost]
        public ActionResult getDefectHistory(string DefectID)
        {
            var data = defecthistorymodel.getDefectHistory(DefectID);

            return Json(data);
        }
    }
}