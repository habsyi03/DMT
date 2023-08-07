using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class admDefectStatus
    {
        public string DefStatusID { get; set; }
        public string DefStatusName { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string IsActive { get; set; }
        public string UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }

        public IList<admDefectStatus> getMasterDefectStatus()
        {
            using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
            {
                if (sqlConnection.State != System.Data.ConnectionState.Open)
                    sqlConnection.Open();

                return sqlConnection.Query<admDefectStatus>("[LoadDefectStatus]", null, commandType: System.Data.CommandType.Text).ToList();
            }
        }

        public DefectStatusResultModel setDefectStatus(string newDefectStatus, string condType, string id)
        {
            int type = 0;

            if (condType.Equals("add"))
            {
                type = 1;
            }
            else if (condType.Equals("update"))
            {
                type = 2;
            }
            else if (condType.Equals("delete"))
            {
                type = 3;
            }

            //int type = 1;
            string CreatedBy = HttpContext.Current.Session["UserID"].ToString();
            //string id = null;

            DefectStatusResultModel obj = new DefectStatusResultModel();
            try
            {
                using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
                {
                    if (sqlConnection.State != System.Data.ConnectionState.Open)
                        sqlConnection.Open();

                    using (var trans = sqlConnection.BeginTransaction())
                    {
                        try
                        {
                            DynamicParameters _dynamicParams = new DynamicParameters(new
                            {
                                @type = type,
                                @id = id,
                                @DefStatusName = newDefectStatus, 
                                @CreatedBy = CreatedBy
                            });

                            sqlConnection.Execute("ManageDefectStatus",
                                                _dynamicParams
                                               , transaction: trans,
                                                commandTimeout: 10,
                                                commandType: System.Data.CommandType.StoredProcedure
                                              );
                            trans.Commit();

                            //return "Success";
                        }
                        catch (Exception e)
                        {
                            //e.Message;
                            trans.Rollback();
                            throw e;
                        }
                    }

                    obj.errorMessage = "Success";
                }
            }
            catch (Exception ex)
            {
                obj.errorMessage = ex.Message;
            }

            return obj;
        }
    }
}

public class DefectStatusResultModel
{
    public string errorMessage { get; set; }
}