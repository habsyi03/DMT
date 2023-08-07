using DMT.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DMT.Controllers
{
    public class DefectController : Controller
    {
        DefectModel defectModel = new DefectModel();
        getDefectIdModel getdefectidmodel = new getDefectIdModel();

        [HttpPost]
        public ActionResult getDefectID()
        {
            var data = getdefectidmodel.getDefectID();
            return Json(data);
        }

        [HttpPost]
        public ActionResult getDefectAll()
        {
            var data = defectModel.getDefectAll();
            return Json(data);
        }

        [HttpPost]
        public ActionResult setDefect(string defectID, string defectTitle, string PriorityID, string DetectInVersion, string DetectedDate, string DefectPhase, string LogTypeID, string DefectDesc, string DefectComments, string AssignedTo, string CreatedBy, string attachFile)
        {
            var result = defectModel.createDefect(defectID, defectTitle, PriorityID, DetectInVersion, DetectedDate, DefectPhase, LogTypeID, DefectDesc, DefectComments, AssignedTo, CreatedBy, attachFile);

            return Json(result);
        }

        [HttpPost]
        public ActionResult updateDefect(string defectID, string PriorityID, string AssignedTo, string DefectStatus, string LogTypeID, string DefectComments, string RetestDate)
        {
            var result = defectModel.updateDefect(defectID, PriorityID, AssignedTo, DefectStatus, LogTypeID, DefectComments, RetestDate);

            return Json(result);
        }

        [HttpPost]
        public void setUploadFile(HttpPostedFileBase imageFile, int i, string name, string DefectID)
        {
            string status = "";
            byte[] imagebyte = null;

            if (imageFile != null && imageFile.ContentLength > 0)
            {
                try
                {
                    //string filename = Path.GetFileNameWithoutExtension(file.FileName);
                    //string extension = Path.GetExtension(imageFile.FileName);
                    string filename = DefectID + "_" + i + "_"+ name;
                    //string filename ="tes"+extension;
                    string path = Path.Combine(Server.MapPath("~/Content/file-upload"), Path.GetFileName(filename));
                    imageFile.SaveAs(path);


                    BinaryReader reader = new BinaryReader(imageFile.InputStream);
                    imagebyte = reader.ReadBytes(imageFile.ContentLength);

                    status = "Success";
                }
                catch (Exception ex)
                {
                    status = "Error:" + ex.Message.ToString();
                }
            }
        }
    }
}