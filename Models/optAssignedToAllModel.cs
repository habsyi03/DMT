using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class optAssignedToAllModel
    {
        public string UserID { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; }

        public IList<optAssignedToAllModel> getOptAllAssignedTo()
        {
            string projectID = HttpContext.Current.Session["ProjectID"].ToString();
            IList<optAssignedToAllModel> tmp = null;
            try
            {
                using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
                {
                    if (sqlConnection.State != System.Data.ConnectionState.Open)
                        sqlConnection.Open();

                    return sqlConnection.Query<optAssignedToAllModel>("stp_getAssignedTo", new
                    {
                        ProjectID = projectID
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