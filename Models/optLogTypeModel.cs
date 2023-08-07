using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class optLogTypeModel
    {
        public string LogTypeID { get; set; }
        public string LogTypeName { get; set; }

        public IList<optLogTypeModel> getOptLogTypeMdl()
        {
            LogTypeModel logTypeModel = new LogTypeModel();
            using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
            {
                if (sqlConnection.State != System.Data.ConnectionState.Open)
                    sqlConnection.Open();

                return sqlConnection.Query<optLogTypeModel>("[stp_getLogType]", null, commandType: System.Data.CommandType.Text).ToList();
            }
        }
    }
}