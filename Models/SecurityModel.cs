using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class SecurityModel
    {
        public string UserID { get; set; }
        public string FullName { get; set; }
        public string ProjectID { get; set; }
        public string Role { get; set; }
        

        public IList<SecurityModel> getDataUser(string UserID, string Password)
        {
            IList<SecurityModel> tmp = null;
            try
            {
                using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
                {
                    if (sqlConnection.State != System.Data.ConnectionState.Open)
                        sqlConnection.Open();

                    return sqlConnection.Query<SecurityModel>("stp_Login", new
                    {
                        UserID = UserID,
                        Password = Password
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