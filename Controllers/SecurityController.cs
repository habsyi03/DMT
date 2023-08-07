using DMT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace DMT.Controllers
{
    public class SecurityController : Controller
    {
        SecurityModel securityModel = new SecurityModel();
        optProjectUserModel optprojectusermodel = new optProjectUserModel();

        public ActionResult Index()
        {
            return View();           
        }

        [HttpPost]
        public ActionResult getDataUser(string UserID, string Password)
        {
            string encPassword = Encryption(Password);
            var data = securityModel.getDataUser(UserID, encPassword);

            if (data.Count >= 1)
            {
                Session["UserID"] = data[0].UserID;
                Session["FullName"] = data[0].FullName;
                Session["ProjectID"] = data[0].ProjectID;
                Session["Role"] = data[0].Role;

                //Session["LoginData"] = data;
            }
            else
            {
                Session["UserID"] = null;
            }

            return Json(data);
        }

        [HttpPost]
        public void setSessionProjectID(string ProjectID)
        {
            Session.Remove("ProjectID");
            Session["ProjectID"] = ProjectID;
        }

        [HttpPost]
        public ActionResult getProjectByUser(string UserID)
        {
            var data = optprojectusermodel.getProjectByUser(UserID);


            return Json(data);
        }

        public string Encryption(string Password)
        {
            MD5 md5 = new MD5CryptoServiceProvider();

            //compute hash from the bytes of text  
            md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(Password));

            //get hash result after compute it  
            byte[] result = md5.Hash;

            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                //change it into 2 hexadecimal digits  
                //for each byte  
                strBuilder.Append(result[i].ToString("x2"));
                //returnValue.Append(hashData[i].ToString());
            }

            return strBuilder.ToString();
        }

        public void destroySession()
        {
            Session.Clear();
        }

        public ActionResult Logout()
        {
            //Session.Abandon();
            Session.Clear();
            return RedirectToAction("Index", "Security");
        }
    }
}