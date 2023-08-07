///<reference path="login_module.js" />

login.service('loginService', ['$http', function ($http) {
    this.getDataUser = function (getDataUser, UserID, Password) {
        return $http({
            url: "/Security/getDataUser",
            method: "post",
            datatype: "json",
            data: {
                "UserID": UserID,
                "Password": Password
            },
        }).then(function (success) {
            getDataUser(success.data);
        }, function (error) {
            alert("Login Error");
        });
    }

    this.getProjectByUser = function (getProjectByUser, UserID) {
        return $http({
            url: "/Security/getProjectByUser",
            method: "post",
            datatype: "json",
            data: {
                "UserID": UserID
            },
        }).then(function (success) {
            getProjectByUser(success.data);
        }, function (error) {
            alert("Authenticate Error");
        });
    }

    this.setDefect = function (ProjectID) {
        return $http({
            url: "/Security/setSessionProjectID",
            method: "post",
            datatype: "json",
            data: {
                "ProjectID": ProjectID
            },
        }).then(function (success) {
            window.location.href = "/Home/Index";
        }, function (error) {
            alert("Project Id Null");
        });
    }
}])
