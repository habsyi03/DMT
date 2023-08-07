var admin = angular.module("adminModule", ['ngMessages', 'datatables']);

admin.controller("adminController", ['$scope', 'adminService', function ($scope, adminService) {
    $scope.optDefectStatusSelected = "optDefectStatusSelected";
    $scope.optLogTypeSelected = "optLogTypeSelected";
    $scope.optPhaseSelected = "optPhaseSelected";
    $scope.optPrioritySelected = "optPrioritySelected";

    $scope.showTblDefectStatus = true;
    $scope.showTblLogType= false;
    $scope.showTblPhase = false;
    $scope.showTblPriority = false;

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
            var status = adminService.setDefectStatus($scope.newDefectStatus);
        }
    }

    $scope.setLogType = function (cond) {
        if (cond == true) {
            var status = adminService.setLogType($scope.newLogType);
        }
    }

    $scope.setPhase = function (cond) {
        if (cond == true) {
            var status = adminService.setPhase($scope.newPhase);
        }
    }
}])