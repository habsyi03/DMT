using DMT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMT.Controllers
{
    public class AssignedToController : Controller
    {
        AssignedToAllModel assignedToAllModel = new AssignedToAllModel();
        AssignedToModel AssignedToModel = new AssignedToModel();
        optAssignedToAllModel optassignedToAllModel = new optAssignedToAllModel();

        [HttpPost]
        public ActionResult getAllAssignedTo()
        {
            var data = assignedToAllModel.getAllAssignedTo();
            return Json(data);
        }

        [HttpPost]
        public ActionResult getOptAllAssignedTo()
        {
            var data = optassignedToAllModel.getOptAllAssignedTo();
            return Json(data);
        }


        [HttpPost]
        public ActionResult getAssignedTo()
        {
            var data = AssignedToModel.getAssignedTo();
            return Json(data);
        }
    }
}