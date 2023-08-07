using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class PhaseModel
    {
        public string PhaseID { get; set; }
        public string PhaseName { get; set; }

        public IList<PhaseModel> getPhase()
        {
            PhaseModel phaseModel = new PhaseModel();
            using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
            {
                if (sqlConnection.State != System.Data.ConnectionState.Open)
                    sqlConnection.Open();

                return sqlConnection.Query<PhaseModel>("[stp_getPhase]", null, commandType: System.Data.CommandType.Text).ToList();
            }
        }
    }
}