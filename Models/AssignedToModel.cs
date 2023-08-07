using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class AssignedToModel
    {
        public string UserID { get; set; }
        public string FullName { get; set; }

        public IList<AssignedToModel> getAssignedTo()
        {
            string projectID = HttpContext.Current.Session["ProjectID"].ToString();
            IList<AssignedToModel> tmp = null;
            try
            {
                using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
                {
                    if (sqlConnection.State != System.Data.ConnectionState.Open)
                        sqlConnection.Open();

                    return sqlConnection.Query<AssignedToModel>("stp_getProjectTLName", new
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