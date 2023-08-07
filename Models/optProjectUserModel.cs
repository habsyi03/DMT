using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class optProjectUserModel
    {
        public string ProjectID { get; set; }
        public string ProjectName { get; set; }


        public IList<optProjectUserModel> getProjectByUser(string UserID)
        {
            //string UserID = HttpContext.Current.Session["UserID"].ToString();
            IList<optProjectUserModel> tmp = null;
            try
            {
                using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
                {
                    if (sqlConnection.State != System.Data.ConnectionState.Open)
                        sqlConnection.Open();

                    return sqlConnection.Query<optProjectUserModel>("stp_getProjectbyUser", new
                    {
                        UserID = UserID
                    }, commandType: System.Data.CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception ex)
            {

            }
            return tmp;
        }
    }
}