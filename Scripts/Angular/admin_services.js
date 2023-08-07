///<reference path="admin_module.js" />

admin.service('adminService', ['$http', function ($http) {
    this.getMasterDefectStatus = function (getMasterDefectStatus) {
        return $http({
            url: "/admin/getMasterDefectStatus",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getMasterDefectStatus(success.data);
        }, function (error) {
            alert("Data Master Defect Status is Empty");
        });
    }

    this.getMasterLogType = function (getMasterLogType) {
        return $http({
            url: "/admin/getMasterLogType",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getMasterLogType(success.data);
        }, function (error) {
            alert("Data Master Log Type is Empty");
        });
    }

    this.getMasterPhase = function (getMasterPhase) {
        return $http({
            url: "/admin/getMasterPhase",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getMasterPhase(success.data);
        }, function (error) {
            alert("Data Master Phase is Empty");
        });
    }

    this.getMasterPriority = function (getMasterPriority) {
        return $http({
            url: "/admin/getMasterPriority",
            method: "post",
            datatype: "json",
        }).then(function (success) {
            getMasterPriority(success.data);
        }, function (error) {
            alert("Data Master Priority is Empty");
        });
    }

    this.setDefectStatus = function (newDefectStatus, condType, id) {
        return $http({
            url: "/admin/setDefectStatus",
            method: "post",
            datatype: "json",
            data: {
                "newDefectStatus": newDefectStatus,
                "condType": condType,
                "id": id
            },
        }).then(function (success) {
            return true;
        }, function (error) {
        });
    }

    this.setLogType = function (newLogType, condType, id) {
        return $http({
            url: "/admin/setLogType",
            method: "post",
            datatype: "json",
            data: {
                "newLogType": newLogType,
                "condType": condType,
                "id": id
            },
        }).then(function (success) {
            return true;
        }, function (error) {
        });
    }

    this.setPhase = function (newPhase, condType, id) {
        return $http({
            url: "/admin/setPhase",
            method: "post",
            datatype: "json",
            data: {
                "newPhase": newPhase,
                "condType": condType,
                "id": id
            },
        }).then(function (success) {
            return true;
        }, function (error) {
        });
    }

    this.deleteDefectStatus = function (newDefectStatus, condType, defectID) {
        return $http({
            url: "/admin/deleteDefectStatus",
            method: "post",
            datatype: "json",
            data: {
                "newDefectStatus": newDefectStatus,
                "condType": condType,
                "defectID": defectID
            },
        }).then(function (success) {
            return true;
        }, function (error) {
        });
    }

    this.deleteLogType = function (newLogType, condType, defectID) {
        return $http({
            url: "/admin/deleteLogType",
            method: "post",
            datatype: "json",
            data: {
                "newLogType": newLogType,
                "condType": condType,
                "defectID": defectID
            },
        }).then(function (success) {
            return true;
        }, function (error) {
        });
    }

    this.deletePhase = function (newPhase, condType, defectID) {
        return $http({
            url: "/admin/deletePhase",
            method: "post",
            datatype: "json",
            data: {
                "newPhase": newPhase,
                "condType": condType,
                "defectID": defectID
            },
        }).then(function (success) {
            return true;
        }, function (error) {
        });
    }
    

}])