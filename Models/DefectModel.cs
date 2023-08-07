using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DMT.Models
{
    public class DefectModel
    {
        public string DefectID { get; set; }
        public string DefectTitle { get; set; }
        public string PriorityID { get; set; }
        public string ProjectID { get; set; }
        public string DetectInVersion { get; set; }
        public string DetectedDate { get; set; }
        public string DefectStatus { get; set; }
        public string DefectPhase { get; set; }
        public string LogTypeID { get; set; }
        public string DefectDesc { get; set; }
        public string DefectComments { get; set; }
        public string AssignedTo { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public string DefStatusName { get; set; }
        public string PriorityName { get; set; }
        public string PhaseName { get; set; }
        public string LogTypeName { get; set; }
        public string AssignedToName { get; set; }
        public string CreatorName { get; set; }

        public IList<DefectModel> getDefectAll()
        {
            string projectID = HttpContext.Current.Session["ProjectID"].ToString();
            string Role = HttpContext.Current.Session["Role"].ToString();
            IList<DefectModel> tmp = null;
            try
            {
                using (var sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["constring"].ConnectionString))
                {
                    if (sqlConnection.State != System.Data.ConnectionState.Open)
                        sqlConnection.Open();

                    return sqlConnection.Query<DefectModel>("LoadDefects", new
                    {
                        projectID = projectID,
                        RoleID = Role
                    }, commandType: System.Data.CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception ex)
            {

            }
            return tmp;
        }

        public DefectResultModel createDefect(string defectID, string defectTitle, string PriorityID, string DetectInVersion, string DetectedDate, string DefectPhase, string LogTypeID, string DefectDesc, string DefectComments, string AssignedTo, string CreatedBy, string attachFile)
        {
            string projectID = HttpContext.Current.Session["ProjectID"].ToString();
            DefectResultModel obj = new DefectResultModel();
            string tempAttach = "";

            if (attachFile != "")
            {
                tempAttach = attachFile;
            }
            else
            {
                tempAttach = null;
            }

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
                                @defectID = defectID,
                                @defectTitle = defectTitle,
                                @PriorityID = PriorityID,
                                @ProjectID = projectID,
                                @DetectInVersion = DetectInVersion,
                                @DetectedDate = DetectedDate,
                                @DefectPhase = DefectPhase,
                                @LogTypeID = LogTypeID,
                                @DefectDesc = DefectDesc,
                                @DefectComments = DefectComments,
                                @AssignedTo = AssignedTo,
                                @CreatedBy = CreatedBy,
                                @AttachFile = tempAttach
                            });

                            sqlConnection.Execute("CreateDefects",
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

        public UpdateResultModel updateDefect(string defectID, string PriorityID, string AssignedTo, string DefectStatus, string LogTypeID, string DefectComments, string RetestDate)
        {
            UpdateResultModel obj1 = new UpdateResultModel();
            string CreatedBy = HttpContext.Current.Session["UserID"].ToString();

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
                                @defectID = defectID,
                                @PriorityID = PriorityID,
                                @AssignedTo = AssignedTo,
                                @DefectStatus = DefectStatus,
                                @LogTypeID = LogTypeID,
                                @DefectComments = DefectComments,
                                @RetestDate = RetestDate,
                                @CreatedBy = CreatedBy
                            });

                            sqlConnection.Execute("UpdateDefects",
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

                    obj1.errorMessage = "Success";
                }
            }
            catch (Exception ex)
            {
                obj1.errorMessage = ex.Message;
            }

            return obj1;
        }
    }

    public class DefectResultModel
    {
        public string errorMessage { get; set; }
    }

    public class UpdateResultModel
    {
        public string errorMessage { get; set; }
    }
}
