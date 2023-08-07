using DMT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMT.Controllers
{
    public class AdminController : Controller
    {
        admDefectStatus admDF = new admDefectStatus();
        admLogType admlogtype = new admLogType();
        admPhase admphase = new admPhase();
        admPriority admpriority = new admPriority();

        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult getMasterDefectStatus()
        {          
            var data = admDF.getMasterDefectStatus();
            return Json(data);
        }

        [HttpPost]
        public ActionResult getMasterLogType()
        {           
            var data = admlogtype.getMasterLogType();
            return Json(data);
        }

        [HttpPost]
        public ActionResult getMasterPhase()
        {         
            var data = admphase.getMasterPhase();
            return Json(data);
        }

        [HttpPost]
        public ActionResult getMasterPriority()
        {           
            var data = admpriority.getMasterPriority();
            return Json(data);
        }

        [HttpPost]
        public ActionResult setDefectStatus(string newDefectStatus, string condType, string id)
        {
            var result = admDF.setDefectStatus(newDefectStatus, condType,id);
            return Json(result);
        }

        [HttpPost]
        public ActionResult setLogType(string newLogType, string condType, string id)
        {
            var result = admlogtype.setLogType(newLogType, condType, id);
            return Json(result);
        }

        [HttpPost]
        public ActionResult setPhase(string newPhase, string condType, string id)
        {
            var result = admphase.setPhase(newPhase, condType, id);
            return Json(result);
        }

        [HttpPost]
        public ActionResult deleteDefectStatus(string newDefectStatus, string condType, string defectID)
        {
            var result = admDF.setDefectStatus(newDefectStatus, condType, defectID);
            return Json(result);
        }

        [HttpPost]
        public ActionResult deleteLogType(string newLogType, string condType, string defectID)
        {
            var result = admlogtype.setLogType(newLogType, condType, defectID);
            return Json(result);
        }

        [HttpPost]
        public ActionResult deletePhase(string newPhase, string condType, string defectID)
        {
            var result = admphase.setPhase(newPhase, condType, defectID);
            return Json(result);
        }
    }
}