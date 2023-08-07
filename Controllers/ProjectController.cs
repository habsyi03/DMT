using DMT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMT.Controllers
{
    public class ProjectController : Controller
    {
        ProjectModel projectModel = new ProjectModel();

        [HttpPost]
        public ActionResult getProject()
        {
            var data = projectModel.getProject();
            return Json(data);
        }
    }
}