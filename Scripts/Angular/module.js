var myApp = angular.module("myModule", ['ngMessages', 'datatables', 'ui.tinymce', 'ngMaterial', 'material.svgAssetsCache']);


myApp.controller("DefectController", ['$scope', 'defectService', function ($scope, defectService) {
    $scope.action = "save";
    $scope.tes = "Project Name";
    $scope.ProjectID = null;

    $scope.DefectAllDataBackup = [];
    $scope.DefectAllDataTemp = [];
    //$scope.optAssignedTo = "All Assigned";
    //$scope.optPhase = "All Phase";
    //$scope.optPriority = "All Priority";
    //$scope.optStatus = "All Status";
    //$scope.optLogTypeData = "All Log Type";
    //$scope.optCreator = "All Creator";
    $scope.sessionRole = getRole();


    $scope.InitbtnAddComment = true;
    $scope.conAssignedTo = false;
    $scope.initbtnEdit = false;
    $scope.initbtnSave = true;



    $scope.tinyMceOptions = {
        setup: function (editor) {
            editor.on("init", function () {
                //alert("tes");
            });

            editor.on("click", function () {
                //alert("tes");
            });
        },
        //inline: true,
        inline_boundaries: false,
        menubar: false,
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        statusbar: true,
        skin: 'lightgray',
        theme: 'modern',
        readonly: false
    }
    //==================================================================================================
    //To Service

    defectService.getPriority(function (getPriority) {
        $scope.priorityData = getPriority;
        $scope.priorityData1 = getPriority;
    });

    defectService.getOptPriority(function (getOptPriority) {
        $scope.optPriorityData = getOptPriority;
    });

    defectService.getTypeOfLog(function (getTypeOfLog) {
        $scope.logTypeData = getTypeOfLog;
        $scope.logTypeData1 = getTypeOfLog;
    });

    defectService.getOptTypeOfLog(function (getOptTypeOfLog) {
        $scope.logOptTypeData = getOptTypeOfLog;
    });

    defectService.getPhase(function (getPhase) {
        $scope.PhaseData = getPhase;
        $scope.PhaseData1 = getPhase;
    });

    defectService.getOptPhase(function (getOptPhase) {
        $scope.optPhaseData = getOptPhase;
    });

    defectService.getStatus(function (getStatus) {
        $scope.StatusData1 = getStatus;
    });

    defectService.getOptStatus(function (getOptStatus) {
        $scope.optStatusData = getOptStatus;
    });

    defectService.getDefectAll(function (getDefectAll) {
        $scope.DefectAllData = getDefectAll;
        $scope.DefectAllDataBackup = $scope.DefectAllData;
        console.log($scope.DefectAllData);
    });

    defectService.getProject(function (getProject) {
        $scope.ProjectData = getProject;
    });

    defectService.getDefectedBy(function (getDefectedBy) {
        $scope.DefectedByData = getDefectedBy;
        $scope.DefectedByData1 = $scope.DefectedByData;
    });

    defectService.getAllAssignedTo(function (getAllAssignedTo) {
        $scope.AssignedToData1 = getAllAssignedTo;
    });

    defectService.getOptAllAssignedTo(function (getOptAllAssignedTo) {
        $scope.OptAssignedToData = getOptAllAssignedTo;
    });

    defectService.getAssignedTo(function (getAssignedTo) {
        $scope.AssignedTo = getAssignedTo;
        $scope.AssignedToDefect = $scope.AssignedTo[0].FullName;
    });

    defectService.getDefectID(function (getDefectID) {
        $scope.DefectIdData = getDefectID;
        $scope.defectID = $scope.DefectIdData[0].DefectID;
    });

    //defectService.setDefect($scope.defectID, $scope.defectTitle, $scope.PriorityID);

    //========================================================================================================
    //init

    $scope.initNewDefect = function () {
        $scope.DefectStatus = "Open";
        $scope.DefectComments = null;
        $scope.CreatedBy = getUserID();
        //$scope.AssignedTo = "";
        $scope.descriptionDefect = "";
    }


    //========================================================================================================
    //Other action
    $scope.SaveCondition;
    $scope.SaveKey;
    $scope.SaveDefectID;

    $scope.RefreshPage = function () {
        //window.location.reload();
        defectService.getDefectAll(function (getDefectAll) {
            $scope.DefectAllData = getDefectAll;
            $scope.DefectAllDataBackup = $scope.DefectAllData;
        });

        $("#alertModaUpdateOk").modal('hide');
        $("#myModal").modal('hide');
    }

    $scope.optStatusClick = function () {
        $scope.tempOptStatusData = $scope.optStatusData.DefStatusID;
    }

    $scope.chgStatus = function (creator) {
        if ($scope.sessionRole != "ADM") {
            if (($scope.tempOptStatusData == "ST001" && ($scope.optStatusData.DefStatusID != "ST002" && $scope.optStatusData.DefStatusID != "ST006"))
                || ($scope.tempOptStatusData == "ST002" && ($scope.optStatusData.DefStatusID != "ST003" && $scope.optStatusData.DefStatusID != "ST006"))
                || ($scope.tempOptStatusData == "ST003" && ($scope.optStatusData.DefStatusID != "ST004" && $scope.optStatusData.DefStatusID != "ST006"))
                || ($scope.tempOptStatusData == "ST004" && ($scope.optStatusData.DefStatusID != "ST005" && $scope.optStatusData.DefStatusID != "ST001" && $scope.optStatusData.DefStatusID != "ST006"))
                || ($scope.tempOptStatusData == "ST005" && $scope.optStatusData.DefStatusID != "ST006")) {
                $scope.optStatusData.DefStatusID = $scope.tempOptStatusData;
                alert("The Status cannot be changed directly");
            }


            //for retest is selected
            if ($scope.optStatusData.DefStatusID == "ST004") {
                $scope.OptAssignedToData.UserID = creator;
                $scope.conAssignedTo = true;
            }
            //for retest to open, assigned to TL
            else if ($scope.tempOptStatusData == "ST004" && $scope.optStatusData.DefStatusID == "ST001") {
                //status retest to open just tester can change it.
                if (creator != getUserID()) {
                    $scope.optStatusData.DefStatusID = $scope.tempOptStatusData;
                    alert("You not have authorized for change this defect");
                } else {
                    $scope.OptAssignedToData.UserID = $scope.AssignedTo[0].UserID;
                    $scope.conAssignedTo = true;
                }
            }
            else {
                $scope.conAssignedTo = false;
            }

            //status retest to closed just tester can change it
            if ($scope.tempOptStatusData == "ST004" && $scope.optStatusData.DefStatusID == "ST005") {
                if (creator != getUserID()) {
                    $scope.optStatusData.DefStatusID = $scope.tempOptStatusData;
                    $scope.conAssignedTo = true;
                    alert("You not have authorized for change this defect");
                }
            }

            //for disable btnEdit and Save if status == closed
            if ($scope.optStatusData.DefStatusID == "ST005") {
                alertCloseDefectModal();
            }
        }
    }

    $scope.chgTypeOfLog = function (creator) {
        //incorect testing approach is selected then assignedto tester 
        if ($scope.logOptTypeData.LogTypeID == "LT007") {
            $scope.OptAssignedToData.UserID = creator;
            $scope.conAssignedTo = true;
        } else {
            $scope.conAssignedTo = false;
        }
    }

    $scope.btnCancelSave = function (key) {
        $scope.InitbtnAddComment = true;
        $scope.initbtnEdit = false;
        $scope.initbtnSave = true;
        $scope.action = key;
        closeModalSave();
    }

    $scope.btnEdit = function (key) {
        if (key) {
            $scope.action = "edit";
        }
    }


    $scope.btnRefresh = function () {
        $scope.DefectAllDataTemp = [];
        for (var i = 0; i < $scope.DefectAllDataBackup.length; i++) {
            $scope.DefectAllDataTemp.push($scope.DefectAllDataBackup[i]);
            $scope.DefectAllData = $scope.DefectAllDataTemp;
        }

        //$scope.optAssignedTo = "All Assigned";
        //$scope.optPhase = "All Phase";
        //$scope.optPriority = "All Priority";
        //$scope.optCreator = "All Creator";
        //$scope.optStatus = "All Status";
        //$scope.optLogTypeData = "All Log Type";

        $scope.AssignedToData1.AssignedTo = "All Assigned";
        $scope.PhaseData1.PhaseID = "All Phase";
        $scope.priorityData1.PriorityID = "All Priority";
        $scope.DefectedByData1.CreatedBy = "All Creator";
        $scope.StatusData1.DefStatusID = "All Status";
        $scope.logTypeData1.LogTypeID = "All Log Type";

        window.location.reload();

    }
    //=========================================================================================================================================
    //get action

    $scope.getFiles = function () {
        var fileupload = $("#fields").get(0).files;
        var fileData = new FormData;

        for (var i = 0; i < fileupload.length; i++) {
            fileData.append("imageFile", fileupload[i]);
        }
    }

    //==========================================================================================================================================
    //set action

    $scope.setDefect = function (x) {
        //console.log($scope.DetectedDate);
        if (x == true) {
            $scope.attachFile = getNameFileAttach();
            upload();
            var status = defectService.setDefect($scope.defectID, $scope.defectTitle, $scope.PriorityID, $scope.DetectInVersion, $scope.DetectedDate, $scope.DefectPhase, $scope.LogTypeID, $scope.DefectDesc, $scope.DefectComments, $scope.AssignedTo[0].UserID, $scope.CreatedBy, $scope.attachFile);

            if (status) {
                alertMessages("Create Defect Success");
            }
        }
    }

    $scope.setDefectOther = function (key) {
        if (key != null) {
            //description
            for (var i = 0; i < $scope.DefectAllData.length; i++) {
                if ($scope.DefectAllData[i].DefectID == key) {
                    $scope.descriptionDefect = $scope.DefectAllData[i].DefectDesc;
                    //$scope.from_one = {
                    //    from_one: $scope.DefectAllData[i].DefectComments
                    //}
                    $scope.Comment = $scope.DefectAllData[i].DefectComments;

                }
            }

            //DefectHistory
            defectService.getDefectHistory(function (getDefectHistory) {
                $scope.DefectHistoryData = getDefectHistory;
                //console.log($scope.DefectHistoryData);
            }, key);
        }
    }

    $scope.btnAddComment = function () {
        //$scope.$emit('$tinymce:refresh');
        //$scope.$broadcast('$tinymce:refresh');
        //$scope.tinyMceOptions = {
        //    //inline: true,
        //    inline_boundaries: false,
        //    menubar: false,
        //    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        //    statusbar: true,
        //    skin: 'lightgray',
        //    theme: 'modern',
        //    readonly: false
        //};



        if ($scope.descriptionDefect) {
            var date = new Date();
            var dd = date.getDate();
            var mm = date.getMonth();
            var yy = date.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            var FullName = getSessionFullName();

            if ($scope.Comment == null) {
                var a = '<br><hr></hr><div style="color:black">' + FullName + ', ' + dd + '-' + mm + '-' + yy + ': </div>';
                $scope.Comment = $scope.Comment + a;

                $scope.Comment = $scope.Comment.slice(42);
            } else {
                var a = '<br><hr></hr><div style="color:black">' + FullName + ', ' + dd + '-' + mm + '-' + yy + ': </div>';
                $scope.Comment = $scope.Comment + a;
            }
        } else {
            alert("Please select the defect on table first before add comment");
        }
    }

    $scope.changeAction = function (condition, key, DefectID) {
        if (condition === "save") {
            console.log($scope.Comment);
            $scope.InitbtnAddComment = true;
            $scope.initbtnEdit = false;
            $scope.initbtnSave = true;

            if ($scope.optStatusData.DefStatusID == "ST004") {
                var date = new Date();
                $scope.RetestDate = date.toISOString();
            } else {
                $scope.RetestDate = null;
            }

            var status = defectService.updateDefect(DefectID, $scope.optPriorityData.PriorityID, $scope.OptAssignedToData.UserID, $scope.optStatusData.DefStatusID, $scope.logOptTypeData.LogTypeID, $scope.Comment, $scope.RetestDate);
            $scope.action = key;
            if (status) {
                alertMessages("Update Success");
            }
        }

        if (condition === "edit") {
            $scope.InitbtnAddComment = false;
            $scope.initbtnEdit = true;
            $scope.initbtnSave = false;
            //$scope.chgTinyMce(false);

            $scope.SaveKey = key;
            $scope.SaveDefectID = DefectID;

            //for binding option on tbody
            for (var i = 0; i < $scope.DefectAllData.length; i++) {
                if ($scope.DefectAllData[i].DefectID == DefectID) {
                    $scope.optPhaseData.PhaseID = $scope.DefectAllData[i].DefectPhase;
                    $scope.optPriorityData.PriorityID = $scope.DefectAllData[i].PriorityID;
                    $scope.optStatusData.DefStatusID = $scope.DefectAllData[i].DefectStatus;
                    $scope.logOptTypeData.LogTypeID = $scope.DefectAllData[i].LogTypeID;
                    $scope.OptAssignedToData.UserID = $scope.DefectAllData[i].AssignedTo;
                    //$scope.OptAssignedToData.UserID = $scope.DefectAllData[i].AssignedTo
                }
            }
            $scope.action = DefectID;
        }
    }

    //============================================================================================================================================
    //FILTER LOGIC
    $scope.filterOptionsHeader = function () {
        //console.log($scope.AssignedToData1.UserID);
        $scope.DefectAllDataTemp = [];
        var isNull = 0;
        for (var i = 0; i < $scope.DefectAllDataBackup.length; i++) {
            if ((($scope.AssignedToData1.UserID != "All Assigned" && $scope.AssignedToData1.UserID != null) ? ($scope.DefectAllDataBackup[i].AssignedTo == $scope.AssignedToData1.UserID) : true) &&
                (($scope.PhaseData1.PhaseID != "All Phase" && $scope.PhaseData1.PhaseID != null) ? ($scope.DefectAllDataBackup[i].DefectPhase == $scope.PhaseData1.PhaseID) : true) &&
                (($scope.priorityData1.PriorityID != "All Priority" && $scope.priorityData1.PriorityID != null) ? ($scope.DefectAllDataBackup[i].PriorityID == $scope.priorityData1.PriorityID) : true) &&
                (($scope.DefectedByData1.CreatedBy != "All Creator" && $scope.DefectedByData1.CreatedBy != null) ? ($scope.DefectAllDataBackup[i].CreatedBy == $scope.DefectedByData1.CreatedBy) : true) &&
                (($scope.StatusData1.DefStatusID != "All Status" && $scope.StatusData1.DefStatusID != null) ? ($scope.DefectAllDataBackup[i].DefectStatus == $scope.StatusData1.DefStatusID) : true) &&
                (($scope.logTypeData1.LogTypeID != "All Log Type" && $scope.logTypeData1.LogTypeID != null) ? ($scope.DefectAllDataBackup[i].LogTypeID == $scope.logTypeData1.LogTypeID) : true)) {
                //console.log("Masuk");
                $scope.DefectAllDataTemp.push($scope.DefectAllDataBackup[i]);
                $scope.DefectAllData = $scope.DefectAllDataTemp;
                isNull++;
            }
        }

        if (isNull == 0) {
            $scope.DefectAllData = null;
        }
    }

    //======================================================================================================================================================
    //ABOUT MODAL
    $scope.CloseDefectModalNoOption = function () {
        $scope.optStatusData.DefStatusID = "ST004";
        $scope.conAssignedTo = true;
        $("#alertCloseDefectModal").modal('hide');
    }

    $scope.CloseDefectModalYesOption = function () {
        $("#alertCloseDefectModal").modal('hide');
    }
}]);