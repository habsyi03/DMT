using DMT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMT.Controllers
{
    public class PhaseController : Controller
    {
        PhaseModel phasemodel = new PhaseModel();
        optPhaseModel optphasemodel = new optPhaseModel();

        [HttpPost]
        public ActionResult getOptPhase()
        {
            var data = optphasemodel.getOptPhase();
            return Json(data);
        }

        [HttpPost]
        public ActionResult getPhase()
        {
            var data = phasemodel.getPhase();
            return Json(data);
        }

        
    }
}