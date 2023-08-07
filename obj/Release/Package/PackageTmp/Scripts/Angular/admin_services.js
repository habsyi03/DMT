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

    this.setDefectStatus = function (newDefectStatus) {
        return $http({
            url: "/admin/setDefectStatus",
            method: "post",
            datatype: "json",
            data: {
                "newDefectStatus": newDefectStatus,
            },
        }).then(function (success) {
            return true;
        }, function (error) {
        });
    }

    this.setLogType = function (newLogType) {
        return $http({
            url: "/admin/setLogType",
            method: "post",
            datatype: "json",
            data: {
                "newLogType": newLogType,
            },
        }).then(function (success) {
            return true;
        }, function (error) {
        });
    }

    this.setPhase = function (newPhase) {
        return $http({
            url: "/admin/setPhase",
            method: "post",
            datatype: "json",
            data: {
                "newPhase": newPhase,
            },
        }).then(function (success) {
            return true;
        }, function (error) {
        });
    }

}])