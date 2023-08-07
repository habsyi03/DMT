using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class admPriority
    {
        public string PriorityID { get; set; }
        public string PriorityName { get; set; }
        public string PriorityLevel { get; set; }
        public string PrioritySLA { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string IsActive { get; set; }
        public string UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }

        public IList<admPriority> getMasterPriority()
        {
            using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
            {
                if (sqlConnection.State != System.Data.ConnectionState.Open)
                    sqlConnection.Open();

                return sqlConnection.Query<admPriority>("[LoadPriority]", null, commandType: System.Data.CommandType.Text).ToList();
            }
        }
    }
}