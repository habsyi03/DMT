using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class ProjectModel
    {
        public string ProjectID { get; set; }
        public string ProjectName { get; set; }
        public string PMid { get; set; }
        public string UserID { get; set; }
        public string FullName { get; set; }
        public string Role { get; set; }

        public IList<ProjectModel> getProject()
        {
            //ProjectModel projectModel = new ProjectModel();
            using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
            {
                if (sqlConnection.State != System.Data.ConnectionState.Open)
                    sqlConnection.Open();

                return sqlConnection.Query<ProjectModel>("[stp_getProjectName]", null, commandType: System.Data.CommandType.Text).ToList();
            }
        }
    }
}