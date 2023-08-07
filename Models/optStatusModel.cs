using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class optStatusModel
    {
        public string DefStatusID { get; set; }
        public string DefStatusName { get; set; }

        public IList<optStatusModel> getOptStatus()
        {
            StatusModel statusModel = new StatusModel();
            using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
            {
                if (sqlConnection.State != System.Data.ConnectionState.Open)
                    sqlConnection.Open();

                return sqlConnection.Query<optStatusModel>("[stp_getDefectStatus]", null, commandType: System.Data.CommandType.Text).ToList();
            }
        }
    }
}