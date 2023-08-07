using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class DefectHistoryModel
    {
        public string DefectDetailID { get; set; }
        public string DefectID { get; set; }
        public string PriorityName { get; set; }
        public string DefStatusName { get; set; }
        public string LogTypeName { get; set; }
        public string DefectComments { get; set; }
        public string CreatedBy { get; set; }
        public string AssignedTo { get; set; }
        public string CreatedDate { get; set; }

        public IList<DefectHistoryModel> getDefectHistory(string DefectID)
        {
            IList<DefectHistoryModel> tmp = null;
            try
            {
                using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
                {
                    if (sqlConnection.State != System.Data.ConnectionState.Open)
                        sqlConnection.Open();

                    return sqlConnection.Query<DefectHistoryModel>("getDefectHistory", new
                    {
                        DefectID = DefectID
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