var myApp = angular.module("myModule", ['ngMessages','serviceModule']);

myApp.controller("PriorityController", ['$scope','$http','defectService', function ($scope,$http,defectService) {
    //$http({
    //    url: "/Priority/getPriority",
    //    method: "POST",
    //    dataType: "json",
    //}).then(function (success) {
    //    $scope.priorityData = success.data;
    //    //console.log(JSON.stringify($scope.priorityData))
    //}, function (error) {
    //    alert("Data Kosong");
    //});
    $scope.priorityData = defectService.getPriority();
    $scope.logTypeData = defectService.getTypeOfLog();

    //$scope.submitForm = function (isValid) {

    //    // check to make sure the form is completely valid
    //    if (isValid) {
    //        alert('our form is amazing');
    //        $scope.x = true;
    //    }
    //    else {
    //        //alert('Invalid');
    //        $scope.x = false;
    //    }

    //};
}]);

//myApp.controller("TypeOfLogController", function ($scope, $http) {
//    $http({
//        url: "/LogType/getLogTypeCtrl",
//        method: "POST",
//        dataType: "json",
//    }).then(function (success) {
//        $scope.logTypeData = success.data;
//        //console.log(JSON.stringify($scope.logTypeData))
//    }, function (error) {
//        alert("Data Kosong");
//    });
//});

//myApp.controller("PhaseController", function ($scope, $http) {
//    $http({
//        url: "/LogType/getLogTypeCtrl",
//        method: "POST",
//        dataType: "json",
//    }).then(function (success) {
//        $scope.logTypeData = success.data;
//        //console.log(JSON.stringify($scope.logTypeData))
//    }, function (error) {
//        alert("Data Kosong");
//    });
//});

