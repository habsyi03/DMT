using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class optPriorityModel
    {
        public string PriorityID { get; set; }
        public string PriorityName { get; set; }
        public string PriorityLevel { get; set; }

        public IList<optPriorityModel> getOptPriority()
        {
            using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
            {
                if (sqlConnection.State != System.Data.ConnectionState.Open)
                    sqlConnection.Open();

                return sqlConnection.Query<optPriorityModel>("[stp_getPriority]", null, commandType: System.Data.CommandType.Text).ToList();
            }
        }
    }
}