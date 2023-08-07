using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class getDefectIdModel
    {
        public string DefectID { get; set; }

        public IList<getDefectIdModel> getDefectID()
        {
            string ProjectID = HttpContext.Current.Session["ProjectID"].ToString();
            IList<getDefectIdModel> tmp = null;
            try
            {
                using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
                {
                    if (sqlConnection.State != System.Data.ConnectionState.Open)
                        sqlConnection.Open();

                    return sqlConnection.Query<getDefectIdModel>("getDefectID", new
                    {
                        projectID = ProjectID
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