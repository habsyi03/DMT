var admin = angular.module("adminModule", ['ngMessages', 'datatables']);

admin.controller("adminController", ['$scope', 'adminService', function ($scope, adminService) {
    $scope.optDefectStatusSelected = "optDefectStatusSelected";
    $scope.optLogTypeSelected = "optLogTypeSelected";
    $scope.optPhaseSelected = "optPhaseSelected";
    $scope.optPrioritySelected = "optPrioritySelected";

    $scope.tempDefectStatusID = null;
    $scope.tempLogTypeID = null;
    $scope.tempPhaseID = null;

    $scope.showTblDefectStatus = true;
    $scope.showTblLogType = false
    $scope.showTblPhase = false;
    $scope.showTblPriority = false;

    $scope.optIsActiveDefectStatus = [
        { model: "0" },
        { model: "1" }
    ];

    $scope.optIsActiveLogType = [
        { model: "0" },
        { model: "1" }
    ];

    $scope.optIsActivePhase = [
        { model: "0" },
        { model: "1" }
    ];

    $scope.initSelectedDefectStatusID = function (DefectStatusID) {
        $scope.tempDefectStatusID = DefectStatusID;
    }

    $scope.initSelectedLogTypeID = function (LogTypeID) {
        $scope.tempLogTypeID = LogTypeID;
    }

    $scope.initSelectedPhaseID = function (PhaseID) {
        $scope.tempPhaseID = PhaseID;
    }

    $scope.initOptMaster = function () {
        $scope.masterTable = "optDefectStatusSelected";
    }

    adminService.getMasterDefectStatus(function (getMasterDefectStatus) {
        $scope.getMasterDefectStatusData = getMasterDefectStatus;
    });

    adminService.getMasterLogType(function (getMasterLogType) {
        $scope.getMasterLogTypeData = getMasterLogType;
    });

    adminService.getMasterPhase(function (getMasterPhase) {
        $scope.getMasterPhaseData = getMasterPhase;
    });

    adminService.getMasterPriority(function (getMasterPriority) {
        $scope.getMasterPriorityData = getMasterPriority;
    });

    $scope.changeDDMasterTable = function () {
        if ($scope.masterTable == "optDefectStatusSelected") {
            $scope.showTblDefectStatus = true;
            $scope.showTblLogType = false;
            $scope.showTblPhase = false;
            $scope.showTblPriority = false;
        }
        else if ($scope.masterTable == "optLogTypeSelected") {
            $scope.showTblDefectStatus = false;
            $scope.showTblLogType = true;
            $scope.showTblPhase = false;
            $scope.showTblPriority = false;
        }
        else if ($scope.masterTable == "optPhaseSelected") {
            $scope.showTblDefectStatus = false;
            $scope.showTblLogType = false;
            $scope.showTblPhase = true;
            $scope.showTblPriority = false;
        }
        else {
            $scope.showTblDefectStatus = false;
            $scope.showTblLogType = false;
            $scope.showTblPhase = false;
            $scope.showTblPriority = true;
        }
    }

    $scope.setDefectStatus = function (cond) {
        if (cond == true) {
            var condType = "add";
            var id = null;
            var status = adminService.setDefectStatus($scope.newDefectStatus, condType, id);

            if (status) {
                $("#mdlAddMasterDefectStatus").modal('hide');
            } else {
                alert("Add failed, please try again next time");
            }
        }
        adminService.getMasterDefectStatus(function (getMasterDefectStatus) {
            $scope.getMasterDefectStatusData = getMasterDefectStatus;
        }); 
    }

    $scope.setLogType = function (cond) {
        if (cond == true) {
            var condType = "add";
            var id = null;
            var status = adminService.setLogType($scope.newLogType, condType, id);

            if (status) {
                $("#mdlAddMasterLogType").modal('hide');
            } else {
                alert("Add failed, please try again next time");
            }
        }

        adminService.getMasterLogType(function (getMasterLogType) {
            $scope.getMasterLogTypeData = getMasterLogType;
        });
    }

    $scope.setPhase = function (cond) {
        if (cond == true) {
            var condType = "add";
            var id = null;
            var status = adminService.setPhase($scope.newPhase, condType, id);

            if (status) {
                $("#mdlAddMasterPhase").modal('hide');
            } else {
                alert("Add failed, please try again next time");
            }
        }

        adminService.getMasterPhase(function (getMasterPhase) {
            $scope.getMasterPhaseData = getMasterPhase;
        });
    }

    //initUpdate
    $scope.initUpdateDefectStatus = function (defectID, defectStatus, isActive) {
        $scope.updateDefectStatusID = defectID;
        $scope.updateDefectStatus = defectStatus;
        $scope.updateIsActiveDefectStatus = isActive;
    }

    $scope.initUpdateLogType = function (LogTypeID, LogType, isActive) {
        $scope.updateLogTypeID = LogTypeID;
        $scope.updateLogType = LogType;
        $scope.updateIsActiveLogTyoe = isActive;
    }

    $scope.initUpdatePhase = function (phaseID, Phase, isActive) {
        $scope.updatePhaseID = phaseID;
        $scope.updatePhase = Phase;
        $scope.updateIsActivePhase = isActive;
    }

    //end of initUpdate

    //saveUpdate
    $scope.saveUpdateDefectStatus = function (cond) {
        if (cond == true) {
            var condType = "update";
            var status = adminService.setDefectStatus($scope.updateDefectStatus, condType, $scope.updateDefectStatusID);

            if (status) {
                $("#mdlUpdateMasterDefectStatus").modal('hide');
            } else {
                alert("Update failed, please try again");
            }
            adminService.getMasterDefectStatus(function (getMasterDefectStatus) {
                $scope.getMasterDefectStatusData = getMasterDefectStatus;
            }); 
        }
    }

    $scope.saveUpdateLogType = function (cond) {
        if (cond == true) {
            var condType = "update";
            var status = adminService.setLogType($scope.updateLogType, condType, $scope.updateLogTypeID);

            if (status) {
                $("#mdlUpdateMasterLogtype").modal('hide');
            } else {
                alert("Update failed, please try again");
            }
            adminService.getMasterLogType(function (getMasterLogType) {
                $scope.getMasterLogTypeData = getMasterLogType;
            });
        }
    }

    $scope.saveUpdatePhase = function (cond) {
        if (cond == true) {
            var condType = "update";
            var status = adminService.setPhase($scope.updatePhase, condType, $scope.updatePhaseID);

            if (status) {
                $("#mdlUpdateMasterPhase").modal('hide');
            } else {
                alert("Update failed, please try again");
            }
            adminService.getMasterPhase(function (getMasterPhase) {
                $scope.getMasterPhaseData = getMasterPhase;
            });
        }
    }
    //end of saveUpdate

    //delete

    $scope.deleteDefectStatus = function () {
        var newDefectStatus = null;
        var condType = "delete";
        var status = adminService.deleteDefectStatus(newDefectStatus, $scope.tempDefectStatusID, condType);
        
        if (status) {
            alertMessages("Delete Defect Status Success");
        }

        adminService.getMasterDefectStatus(function (getMasterDefectStatus) {
            $scope.getMasterDefectStatusData = getMasterDefectStatus;
        });
    }

    $scope.deleteLogType = function () {
        var newLogType = null;
        var condType = "delete";
        var status = adminService.deleteLogType(newLogType, $scope.tempLogTypeID, condType);

        if (status) {
            alertMessages("Delete Log Type Success");
        }

        adminService.getMasterLogType(function (getMasterLogType) {
            $scope.getMasterLogTypeData = getMasterLogType;
        });
    }

    $scope.deletePhase = function () {
        var newPhase = null;
        var condType = "delete";
        var status = adminService.deletePhase(newPhase, $scope.tempPhaseID, condType);

        if (status) {
            alertMessages("Delete Phase Success");
        }

        adminService.getMasterPhase(function (getMasterPhase) {
            $scope.getMasterPhaseData = getMasterPhase;
        });
    }

}])