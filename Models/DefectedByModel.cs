using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class DefectedByModel
    {
        public string CreatedBy { get; set; }
        public string FullName { get; set; }

        public IList<DefectedByModel> getCreator()
        {
            string projectID = HttpContext.Current.Session["ProjectID"].ToString();
            IList<DefectedByModel> tmp = null;
            try
            {
                using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
                {
                    if (sqlConnection.State != System.Data.ConnectionState.Open)
                        sqlConnection.Open();

                    return sqlConnection.Query<DefectedByModel>("stp_getCreator", new
                    {
                        projectID = projectID
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