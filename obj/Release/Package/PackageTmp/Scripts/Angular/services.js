//var serviceModule = angular.module('serviceModule', []);
///<reference path="module.js" />

myApp.service('defectService', ['$http', function ($http) {
    this.getPriority = function (getPriority) {
        //return $.ajax({
        //    method: 'post',
        //    url: '/priority/getpriority',
        //    datatype: "json",
        //    aysnc: false,
        //    success: function (success) {
        //        getPriority(success);
        //    },
        //    error: function () {

        //    }
        //});
        return $http({
            url: "/priority/getpriority",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getPriority(success.data);
        }, function (error) {
            alert("Priority Data is Empty");
        });
    }

    this.getOptPriority = function (getOptPriority) {
        return $http({
            url: "/priority/getOptPriority",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getOptPriority(success.data);
        }, function (error) {
            alert("Priority Option Data is Empty");
        });
    }

    this.getTypeOfLog = function (getTypeOfLog) {
        return $http({
            url: "/LogType/getLogTypeCtrl",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getTypeOfLog(success.data);
        }, function (error) {
            alert("Log Type Data is Empty");
        });
    }

    this.getOptTypeOfLog = function (getOptTypeOfLog) {
        return $http({
            url: "/LogType/getOptLogTypeCtrl",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getOptTypeOfLog(success.data);
        }, function (error) {
            alert("Log Type Options Data is Empty");
        });
    }

    this.getPhase = function (getPhase) {
        return $http({
            url: "/Phase/getPhase",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getPhase(success.data);
        }, function (error) {
            alert("Phase Data is Empty");
        });
    }

    this.getOptPhase = function (getOptPhase) {
        return $http({
            url: "/Phase/getOptPhase",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getOptPhase(success.data);
        }, function (error) {
            alert("Phase Options Data is Empty");
        });
    }

    this.getStatus = function (getStatus) {
        return $http({
            url: "/Status/getStatus",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getStatus(success.data);
        }, function (error) {
            alert("Status Data is Empty");
        });
    }

    this.getOptStatus = function (getOptStatus) {
        return $http({
            url: "/Status/getOptStatus",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getOptStatus(success.data);
        }, function (error) {
            alert("Status Options Data is Empty");
        });
    }

    this.getDefectAll = function (getDefectAll) {
        return $http({
            url: "/Defect/getDefectAll",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getDefectAll(success.data);
        }, function (error) {
            alert("data kosong");
        });
    }

    this.getDefectID = function (getDefectID) {
        return $http({
            url: "/Defect/getDefectID",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getDefectID(success.data);
        }, function (error) {
            alert("data kosong");
        });
    }

    this.getProject = function (getProject) {
        return $http({
            url: "/Project/getProject",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getProject(success.data);
        }, function (error) {
            alert("data kosong");
        });
    }

    this.getDefectedBy = function (getDefectedBy) {
        return $http({
            url: "/DefectedBy/getDefectedBy",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getDefectedBy(success.data);
        }, function (error) {
            alert("data kosong");
        });
    }

    this.setDefect = function (defectID, defectTitle, PriorityID, DetectInVersion, DetectedDate, DefectPhase, LogTypeID, DefectDesc, DefectComments, AssignedTo, CreatedBy, attachFile) {
        return $http({
            url: "/Defect/setDefect",
            method: "post",
            datatype: "json",
            data: {
                "defectID": defectID,
                "defectTitle": defectTitle,
                "PriorityID": PriorityID,
                //"ProjectID": ProjectID,
                "DetectInVersion": DetectInVersion,
                "DetectedDate": DetectedDate,
                "DefectPhase": DefectPhase,
                "LogTypeID": LogTypeID,
                "DefectDesc": DefectDesc,
                "DefectComments": DefectComments,
                "AssignedTo": AssignedTo,
                "CreatedBy": CreatedBy,
                "attachFile": attachFile
            },
        }).then(function (success) {
            //getDefectedBy(success.data);
            return true;
        }, function (error) {
            //alert("data kosong");
        });
    }

    this.updateDefect = function (defectID, PriorityID, AssignedTo, DefectStatus, LogTypeID, DefectComments, RetestDate) {
        return $http({
            url: "/Defect/updateDefect",
            method: "post",
            datatype: "json",
            data: {
                "defectID": defectID,
                "PriorityID": PriorityID,
                "AssignedTo": AssignedTo,
                "DefectStatus": DefectStatus,
                "LogTypeID": LogTypeID,
                "DefectComments": DefectComments,
                "RetestDate": RetestDate
            },
        }).then(function (success) {
            return true;
        }, function (error) {
            alert("Update Error");
        });
    }

    this.getAllAssignedTo = function (getAllAssignedTo) {
        return $http({
            url: "/AssignedTo/getAllAssignedTo",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getAllAssignedTo(success.data);
        }, function (error) {
            alert("getAllAssignedTo Error");
        });
    }

    this.getOptAllAssignedTo = function (getOptAllAssignedTo) {
        return $http({
            url: "/AssignedTo/getOptAllAssignedTo",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getOptAllAssignedTo(success.data);
        }, function (error) {
            alert("getOptAllAssignedTo Error");
        });
    }

    this.getAssignedTo = function (getAssignedTo) {
        return $http({
            url: "/AssignedTo/getAssignedTo",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getAssignedTo(success.data);
        }, function (error) {
            alert("getAssignedTo Error");
        });
    }

    this.getDefectHistory = function (getDefectHistory, DefectID) {
        return $http({
            url: "/DefectHistory/getDefectHistory",
            method: "post",
            datatype: "json",
            data: {
                "DefectID": DefectID
            },
        }).then(function (success) {
            getDefectHistory(success.data, DefectID);
        }, function (error) {
            alert("getDefectHistory Error");
        });
    }
}]);