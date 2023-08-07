var login = angular.module("securityModule", ['ngMessages']);


login.controller("securityController", ['$scope', 'loginService', function ($scope, loginService) {
    //loginservice.login(function (getdatauser) {
    //    $scope.datauser = getdatauser;
    //},$scope.userid,$scope.password);

    $scope.initSelectProject = true;
    $scope.initShowPassword = false;

    $scope.authenticate = function (x) {
        if (x == true) {
            loginService.getDataUser(function (getDataUser) {
                $scope.DataUser = getDataUser;
                //console.log($scope.DataUser.length);

                if ($scope.DataUser.length != 0) {
                    $scope.initShowPassword = false;
                    $scope.authenticate1();
                } else {
                    $scope.initShowPassword = true;
                    //setBorderInvalid();
                }

            }, $scope.UserID, $scope.Password);
        }
    }


    $scope.authenticate1 = function () {
        loginService.getProjectByUser(function (getProjectByUser) {
            $scope.DataProject = getProjectByUser;
            //console.log($scope.DataProject);

            if ($scope.DataProject.length > 1) {
                $scope.initSelectProject = false;
            } else {
                if ($scope.UserID == "Admin" || $scope.UserID == "admin") {
                    window.location.href = "/Admin/Index";
                } else {
                    window.location.href = "/Home/Index";
                }
            }


        }, $scope.UserID);
    }

    $scope.login = function () {
        if ($scope.projectSelected != undefined) {
            loginService.setDefect($scope.projectSelected);
        }
    }

}]);
