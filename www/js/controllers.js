angular.module('app.controllers', [])



.controller('loginCtrl', function($scope,$http,$state,$stateParams,$cordovaSpinnerDialog,$ionicPopup,$cordovaNetwork) {
            
            $scope.$on('$ionicView.enter', function(){
                       $scope.loadFeeds();
                       });
            
            $scope.loadFeeds = function(){
             var checkStatus = window.localStorage.getItem('UserName');
            console.log('Check Value is '+checkStatus);
            if(checkStatus != null)
            {
            
            $scope.SSOId = window.localStorage.getItem("UserName");
            $scope.SSOPsw = window.localStorage.getItem("Password");
            $scope.checkStatus=true;
            
            }
            
            
            
            }
            
//            $scope.$on('$ionicView.loaded', function() {
//                                              ionic.Platform.ready( function() {
//                                                   if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
//                                                                                                               });
//                                              });

            $scope.checkboxstatus = function(){
            
            
             $scope.statusofcheckbox=!$scope.statusofcheckbox;
            }
            
            $scope.statusofcheckbox=false;
            var db;var GetTurbaiData;
            $scope.LoginCheck = function(SUserName,SPassword){
            
            var isOnline = $cordovaNetwork.isOnline();
            
            var isOffline = $cordovaNetwork.isOffline();
            
            if(isOnline == true){
            if(SUserName == undefined){
            
            
                  // alert("Please Enter User Name");
            var alertPopup = $ionicPopup.alert({
                                               title: 'dPOD',
                                               template: 'Please Enter User Name'
                                               });
            
            alertPopup.then(function(res) {
                            console.log('Thank you for not eating my delicious ice cream cone');
                            });
            
            
            }
            else if (SPassword == undefined){
            
            var alertPopup = $ionicPopup.alert({
                                               title: 'dPOD',
                                               template: 'Please Enter Your Password'
                                               });
            
            alertPopup.then(function(res) {
                            console.log('Thank you for not eating my delicious ice cream cone');
                            });
            
          //  alert("Please Enter Your Password");
            
            }
            else{
            $cordovaSpinnerDialog.show("","Authentication Process", true);
            
             /*$http.post('https://fssfed.stage.ge.com/fss/as/token.oauth2?grant_type=password&username=501272213&password=Smart@2005year&client_id=GECorp_wind_bladeinspection_Client&client_secret=pza4LjkeQORZAy1r5bTCJ2iBmq7zNBtOx97t8bJuGJOw3qi09W6sGE0y0dA8vsmX&scope=GECorp_wind_bladeinspection_API').
            */
            /* $http.post('https://fssfed.stage.ge.com/fss/as/token.oauth2?grant_type=password&username=501272213&password=Smart@2005year&client_id=GECorp_wind_bladeinspection_Client&client_secret=pza4LjkeQORZAy1r5bTCJ2iBmq7zNBtOx97t8bJuGJOw3qi09W6sGE0y0dA8vsmX&scope=GECorp_wind_bladeinspection_API').*/
            
            $http.post('https://fssfed.stage.ge.com/fss/as/token.oauth2?grant_type=password&username='+SUserName+'&password='+SPassword+'&client_id=GECorp_wind_bladeinspection_Client&client_secret=pza4LjkeQORZAy1r5bTCJ2iBmq7zNBtOx97t8bJuGJOw3qi09W6sGE0y0dA8vsmX&scope=GECorp_wind_bladeinspection_API').
             success(function (response) {
                    if(!response.access_token){
                    $cordovaSpinnerDialog.hide();
                    
//                    var alertPopup = $ionicPopup.alert({
//                                                       title: 'dPOD',
//                                                       template: 'Authentication Failed'
//                                                       });
//                    
//                    alertPopup.then(function(res) {
//                                    console.log('Thank you for not eating my delicious ice cream cone');
//                                    });
//                    
 $state.go('menu.startOfTheDay', {reload: true});
                    }
                    else{
                    $cordovaSpinnerDialog.hide();
                    //    $state.go('menu.startOfTheDay', {reload: true});
                    
                    
                
                    
                    console.log('checkStatus is '+$scope.statusofcheckbox);
                    if($scope.statusofcheckbox==true){
                    window.localStorage.removeItem('UserName');
                    window.localStorage.removeItem('Password');
                    window.localStorage.setItem('UserName', SUserName);
                    window.localStorage.setItem('Password', SPassword);
                    
                    }
                    SaveData();
                    
                    }
                    }).error(function (xhr, ajaxOptions, thrownError) {
                             $cordovaSpinnerDialog.hide();
                             
                             if($scope.statusofcheckbox==true){
                             window.localStorage.removeItem('UserName');
                             window.localStorage.removeItem('Password');
                             window.localStorage.setItem('UserName', SUserName);
                             window.localStorage.setItem('Password', SPassword);
                             
                             }
                             SaveData();
//                             window.localStorage.removeItem('UserName');
//                             window.localStorage.removeItem('Password');
//                             $state.go('menu.startOfTheDay', {reload: true});
//                             var alertPopup = $ionicPopup.alert({
//                                                                title: 'dPOD',
//                                                                template: 'Authentication Failed'
//                                                                });
//                             
//                             alertPopup.then(function(res) {
//                                             console.log('Thank you for not eating my delicious ice cream cone');
//                                             });
                             
                             
                             });
            
            
            }}else{
            
            var alertPopup = $ionicPopup.alert({
                                               title: 'dPOD',
                                               template: 'Network Error!'
                                               });
            
            alertPopup.then(function(res) {
                            console.log('Thank you for not eating my delicious ice cream cone');
                            });
            
          //  alert("");
            
            
            
            }}
            function SaveData(){
            db = window.openDatabase("GedopdAppDb", "3.0", "gedopdAppDb", 5000000);
            db.transaction(CheckFirstTimeInsertornot, errorCB ,successDB);
            
            }
            function CheckFirstTimeInsertornot(tx){
            tx.executeSql('SELECT * FROM task_detail',[],getLengthforUpdate,errorCB);
            }
            function errorCB(err) {
            console.log("Error processing SQL: "+err.code);
            console.log("Error processing  message SQL: "+err.message);
            }
            function successDB(){
            
            }
            function getLengthforUpdate(tx,results){
            var ResonLength = results.rows.length;
            
            
            
            if(ResonLength == 0)
            inserTask_detail();
            else
            updateTask_detail();
            }
            
            function inserTask_detail(){
            
            
            $http.get('js/taskinfo.json').success(function(data){
                                                  GetTurbaiData = data;
                                                  
                                                  db = window.openDatabase("GedopdAppDb", "3.0", "gedopdAppDb", 5000000);
                                                  db.transaction(TaskTableInsert, errorCB,insertSuss);
                                                  
                                                  }).error(function (xhr, ajaxOptions, thrownError) {
                                                           $cordovaSpinnerDialog.hide();
                                                           //alert("Authentication Failed");
                                                           console("Error");
                                                           console('Sttaus '+xhr.status);
                                                           console('Error '+thrownError);
                                                           });
            
            
            
            }
            function TaskTableInsert(tx){
            
            
            
            
            for(i=0;i<GetTurbaiData.taskList.length;i++){
            
            
            console.log(GetTurbaiData.taskList[i].userSSO);
            
            
            
            
            
            
            tx.executeSql('INSERT INTO task_detail (userSSO,turbineId,turbineNumber,turbineStatus,plannedTime,turbineOrder,taskHistId,taskType,taskDescription,priority,markedAsRemoved,markedAsDone,alreadyDone,notes,faultId,externalNotes,resolutionNotes,taskId,taskName,taskCreatedDateTime,estimatedTime,syncStatus,taskStatus,taskDueDateTime,taskparts,techniciansNeeded,taskRecurrence,taskGroup,taskInternalNotes,taskExternalNotes,taskImageUrl,tower,reccurance,Groups,section,timer) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[GetTurbaiData.taskList[i].userSSO,GetTurbaiData.taskList[i].turbineId,GetTurbaiData.taskList[i].turbineNumber,GetTurbaiData.taskList[i].turbineStatus,GetTurbaiData.taskList[i].plannedTime,GetTurbaiData.taskList[i].turbineOrder,GetTurbaiData.taskList[i].taskHistId,GetTurbaiData.taskList[i].taskType,GetTurbaiData.taskList[i].taskDescription,GetTurbaiData.taskList[i].priority,GetTurbaiData.taskList[i].markedAsRemoved,GetTurbaiData.taskList[i].markedAsDone,GetTurbaiData.taskList[i].alreadyDone,GetTurbaiData.taskList[i].notes,GetTurbaiData.taskList[i].faultId,GetTurbaiData.taskList[i].externalNotes,GetTurbaiData.taskList[i].resolutionNotes,GetTurbaiData.taskList[i].taskId,GetTurbaiData.taskList[i].taskName,GetTurbaiData.taskList[i].taskCreatedDateTime,GetTurbaiData.taskList[i].estimatedTime,GetTurbaiData.taskList[i].syncStatus,GetTurbaiData.taskList[i].taskStatus,GetTurbaiData.taskList[i].taskDueDateTime,GetTurbaiData.taskList[i].taskparts,GetTurbaiData.taskList[i].techniciansNeeded,GetTurbaiData.taskList[i].taskRecurrence,GetTurbaiData.taskList[i].taskGroup,GetTurbaiData.taskList[i].taskInternalNotes,GetTurbaiData.taskList[i].taskExternalNotes,GetTurbaiData.taskList[i].taskImageUrl,GetTurbaiData.taskList[i].tower,GetTurbaiData.taskList[i].reccurance,GetTurbaiData.taskList[i].Groups,GetTurbaiData.taskList[i].section,GetTurbaiData.taskList[i].timer]);
            
            
            }
            
            
            }
            
            function updateTask_detail(){
            $state.go('menu.startOfTheDay', {reload: true});
            }
            function insertSuss(){
            //alert("InsertFine");
            $state.go('menu.startOfTheDay', {reload: true});
            }
            
            })

.controller('startOfTheDayCtrl', function($scope,$http,$state,$stateParams,$location, $timeout,BlankFactory) {
            var db = "";var GetTurbai= "";var taskdetailtablelegthafterinsert= ""; $scope.GetTurbaiDatas = [];
            var startCount=0;
            var completedCount =0;
            var notStartCount=0;
            
            function errorCB(err) {
            console.log("Error processing SQL: "+err.code);
            console.log("Error processing  message SQL: "+err.message);
            }
            
            $scope.$on('$ionicView.enter', function(){
                       $scope.loadFeeds();
                       });
            
            $scope.loadFeeds = function(){
            // alert("OKOKOK");
            db = window.openDatabase("GedopdAppDb", "3.0", "gedopdAppDb", 5000000);
            db.transaction(GetDataforTaskTable, errorCB ,getRecordsuccessDB);
            }
            
            
            
            
            
            function GetDataforTaskTable (tx){
            
            tx.executeSql('SELECT * FROM task_detail',[],getTaskinfoDataforTaskpage,errorCB);
            }
            function getTaskinfoDataforTaskpage(tx,results){
            $timeout(function(){
                     debugger;
                     taskdetailtablelegthafterinsert = results.rows.length;
                     $scope.GetTurbaiDatas = [];
                     completedCount = 0;notStartCount=0;startCount=0;
                     console.log('completedCountData'+completedCount);
                      debugger;
                     for (var i=0; i< taskdetailtablelegthafterinsert; i++) {
                     GetTurbai = results.rows.item(i);
              debugger;
                    console.log('completedCountData'+completedCount);
                     if(GetTurbai.taskStatus=="completed")
                     completedCount = completedCount+1;
                     else if(GetTurbai.taskStatus=="NotStart")
                     notStartCount = notStartCount+1;
                     else if(GetTurbai.taskStatus=="Start")
                     startCount = startCount+1;
                     console.log('yes or no  '+results.rows.item(i).syncStatus)
                     debugger;
                     $scope.GetTurbaiDatas.push({
                                                task_turbine_id: results.rows.item(i).turbineNumber,
                                                task_type: results.rows.item(i).taskName,
                                                task_added_on_date: results.rows.item(i).taskCreatedDateTime,
                                                task_est_duration_hrs: results.rows.item(i).estimatedTime,
                                                task_turbine_status: results.rows.item(i).turbineStatus,
                                                sync_status: results.rows.item(i).syncStatus,
                                                task_status: results.rows.item(i).taskStatus
                                                
                                                });
                     
                     }
                     
                     
                     },500);
            console.log("$scope.GetTurbaiDatas"+ JSON.stringify($scope.GetTurbaiDatas));
            
            }
            function getRecordsuccessDB(){
            $timeout(function(){
                     debugger;
                     for(i=0;i<taskdetailtablelegthafterinsert;i++){
                     
                     }
                     //                     alert('completedCount'+completedCount);
                     //                      alert('startCount'+completedCount);
                     //                      alert('notStartCount'+completedCount);
                     var     CC = completedCount/taskdetailtablelegthafterinsert*100;
                     
                     CC = CC.toFixed(0);
                     
                   
                     
                     var     ST = startCount/taskdetailtablelegthafterinsert*100;
                     ST = ST.toFixed(0);
                     
                     
                     var     NS = notStartCount/taskdetailtablelegthafterinsert*100;
                     NS = NS.toFixed(0);
                     
                     
                     // alert('CC'+CC);alert('ST'+ST);alert('NS'+NS);
                     
                     //$scope.GetTurbaiDatas = GetTurbai;
                     
                     $scope.vm = this;
                     $scope.vm.options = {
                     chart: {
                     type: 'pieChart',
                     height: 250,
                     x: function(d){return d.key;},
                     y: function(d){return d.y;},
                     color: function(d){return d.color;},
                     showLabels: false,
                     legendPosition: "right",
                     duration: 500, labelThreshold: 0.01,
                     labelSunbeamLayout: true,
                     title: "",
                     donut: true,
                     tooltips: true,
                     legend: { margin: { top: 10,
                     right: 0,
                     bottom: 5,
                     left: 15
                     } } } };
                     $scope.vm.data =
                     [ {
                      key: CC+"%" + "Completed",
                      y: CC, color : "#8AC63C" },
                      { key: ST+"%"+" Progress",
                      y: ST, color : "#F89400" },
                      { key: NS+"%"+" Not Completed",
                      y: NS, color : "#B6B9B1" } ]; }
                     ,500);
            }
            //
            //            $scope.vm = this;
            //
            //            $scope.vm.options = {
            //            chart: {
            //            type: 'pieChart',
            //            height: 250,
            //            x: function(d){return d.key;},
            //            y: function(d){return d.y;},
            //            showLabels: false,
            //            legendPosition: "right",
            //            duration: 500,
            //            labelThreshold: 0.01,
            //            labelSunbeamLayout: true,
            //            title: "",
            //            donut: true,
            //            tooltips: true,
            //            legend: {
            //            margin: {
            //            top: 5,
            //            right: 0,
            //            bottom: 5,
            //            left: 0
            //            }
            //            }
            //            }
            //            };
            //
            //            $scope.vm.data = [
            //                              {
            //                              key: "Completed",
            //                              y: CC
            //                              },
            //                              {
            //                              key: "Progress",
            //                              y: ST
            //                              },
            //                              {
            //                              key: "Not Completed",
            //                              y: NS
            //                              }
            //                              ];
            //
            //            },500);
            //
            //            }
            
            
            
            $scope.DetailsPage = function(getid){
            //alert('getElementsi' +getid);
            //           // $location.path("/page5");
            
            BlankFactory.setValue(getid);
            
            $state.go('RequestForTaskInfo', {reload: true});
            
            }
            
            
            })

.controller('executionCtrl', function($scope) {
            
            })

.controller('revisionCtrl', function($scope,$state,$cordovaCamera,$cordovaCapture,$stateParams,$window,$http) {
            $scope.OpenCamara = function(){
            //            alert("Camera");
            
            var options = {
            quality: 75,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
            };
            
            $cordovaCamera.getPicture(options).then(function (imageData) {
                                                    // alert('images data is'+imageData);
                                                    var smallImage = document.getElementById('smallImage');
                                                    
                                                    // Unhide image elements
                                                    //
                                                    smallImage.style.display = 'block';
                                                    
                                                    // Show the captured photo
                                                    // The inline CSS rules are used to resize the image
                                                    //
                                                    smallImage.src = imageData;
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    }, function (err) {
                                                    Console.log('Error is' + err);
                                                    });
            //
            //
            //
            //
            
            
            
            }
            $scope.OpenVideo = function(){
            
            
            
            $scope.captureVideo = function() {
            var options = { limit: 1, duration: 15 };
            
            $cordovaCapture.captureVideo(options).then(function(videoData) {
                                                       //   alert('videoData is  ' +videoData);
                                                       
                                                       console.log("Success");
                                                       console.dir(videoData[0]);
                                                       var v = "<video controls='controls'>";
                                                       v += "<source src='" + videoData[0].fullPath + "' type='video/mp4'>";
                                                       v += "</video>";
                                                       document.querySelector("#videoArea").innerHTML = v;
                                                       
                                                       
                                                       
                                                       
                                                       
                                                       
                                                       
                                                       
                                                       // Success! Video data is here
                                                       }, function(err) {
                                                       Console.log('Error is' + err);
                                                       // An error occurred. Show a message to the user
                                                       });
            }
            
            
            
            
            }
            })

.controller('debriefingCtrl', function($scope) {
            
            })
.controller('taskInfoCtrl', function($scope,$http,$state,$stateParams,$cordovaCamera,$timeout,$interval,BlankFactory,$cordovaSpinnerDialog,$ionicModal,$ionicPopup) {
            $scope.images = [];
            var imageCount=0;
            $scope.detailStatus = "More Details";
            var db = "";var TaskDetailsInfo = "";$scope.TaskDetailsInfomation = [];$scope.MoreDetails = [];
            $scope.unquid = "";
            
            
            $scope.$on('$ionicView.enter', function(){
                       $scope.loadFeeds();
                       });
            
            $scope.loadFeeds = function(){
            //  $cordovaSpinnerDialog.show("","Loading data...", true);
            
            
            $scope.unquid = BlankFactory.getValue();
            
            
            db = window.openDatabase("GedopdAppDb", "3.0", "gedopdAppDb", 5000000);
            db.transaction(GetSelectIdData, errorCB ,checkidStatus);
            
            
            }
            function checkidStatus(){
            
            }
            function errorCB(err) {
            console.log("Error processing SQL: "+err.code);
            console.log("Error processing  message SQL: "+err.message);
            }
            function GetSelectIdData(tx){
            
            
            tx.executeSql('SELECT * FROM task_detail WHERE turbineNumber= ?',[$scope.unquid],querySuccess,errorCB);
            
            }
            
            function querySuccess (tx,results){
            var getTaskDetailsLength = results.rows.length;
            $timeout(function(){
                     debugger;
//                     $scope.timerWithTimeout = results.rows.item(0).timer;
                     var DBTimeout = results.rows.item(0).timer;
                     
                     var res= [];
                     res = DBTimeout.split(":");
                     
                     $scope.MintestValue = res[0];
                     
                     $scope.timerWithTimeout=res[1];
                     
                     
                     
                     
                     if($scope.timerWithTimeout==0 )
                     $scope.buttonText="Start";
                     else
                     $scope.buttonText="Resume";

                     
                     
                     
                     
                     $scope.TaskDetailsInfomation.push({
                                                       taskName:results.rows.item(0).taskName,
                                                       turbineStatus:results.rows.item(0).turbineStatus,
                                                       turbineNumber:results.rows.item(0).turbineNumber,
                                                       estimatedTime:results.rows.item(0).estimatedTime,
                                                       taskDueDateTime:results.rows.item(0).taskDueDateTime,
                                                       priority:results.rows.item(0).priority,
                                                       techniciansNeeded:results.rows.item(0).techniciansNeeded,
                                                       task_added_on_date:results.rows.item(0).taskCreatedDateTime
                                                       
                                                       });
                     
                     var s = document.getElementById("comment-textarea");
                     s.value = results.rows.item(0).notes;
                     $scope.$apply(function () {
                                   debugger;
                                   var CheckData = results.rows.item(0).taskImageUrl;
                                   var GetAllImages = JSON.parse(CheckData);
                                   
                                   for(i=0;i<GetAllImages.length;i++){
                                   

                                   debugger;
                                   console.log()
                                    $scope.images.push(cordova.file.tempDirectory +"/"+ GetAllImages[i]);
                                   debugger;
                                   }
                                   
                                  
                                   
                                   });
                     
                     
//                     
//                     var smallImage = document.getElementById('smallImage');
//                     smallImage.src = results.rows.item(0).taskImageUrl;
//                     
                     //$scope.AddNoteDescrioption = results.rows.item(0).notes;
                     
                     for (var i=0; i< getTaskDetailsLength; i++) {
                     
                     $scope.taskName = results.rows.item(i).taskName,
                     $scope.turbineStatus = results.rows.item(i).turbineStatus,
                     $scope.turbineNumber = results.rows.item(i).turbineNumber,
                     $scope.estimatedTime = results.rows.item(i).estimatedTime,
                     $scope.taskDueDateTime = results.rows.item(i).taskDueDateTime,
                     $scope.priority = results.rows.item(i).priority,
                     $scope.techniciansNeeded = results.rows.item(i).techniciansNeeded,
                     $scope.task_added_on_date = results.rows.item(i).taskCreatedDateTime
                     
                     
                     
                     $scope.MoreDetailsis  =
                     [ { taskName: 'Description', image:'img/TaskInfo/icon_description_3X.png',taskDes:results.rows.item(i).taskDescription },
                      { taskName: 'Taskparts', image:'img/TaskInfo/parts_3X.png',taskDes:results.rows.item(i).taskparts },
                      { taskName: 'Tower', image:'img/TaskInfo/tower_3X.png',taskDes:results.rows.item(i).tower },
                      { taskName: 'Reccurance', image:'img/TaskInfo/recurrance_3x.png',taskDes:results.rows.item(i).reccurance },
                      { taskName: 'Groups', image:'img/TaskInfo/group_3x.png',taskDes:results.rows.item(i).Groups },
                      { taskName: 'Section', image:'img/TaskInfo/section_3x.png',taskDes:results.rows.item(i).section },
                      { taskName: 'Task Internal Notes', image:'img/TaskInfo/notes_3x.png',taskDes:results.rows.item(i).taskInternalNotes },
                      { taskName: 'Task External Notes', image:'img/TaskInfo/notes_3x.png',taskDes:results.rows.item(i).taskExternalNotes }
                      ];
                     
                     
                     
                     
                     
                     
                     }
                     for (var i=0; i< getTaskDetailsLength; i++) {
                     //                                  if(!results.rows.item(i).taskDescription){
                     //                                        $scope.TaskDetailsInfomation.push({
                     //                                            });
                     //                                    }
                     //                      if(!results.rows.item(i).taskparts){
                     //
                     //                      }
                     //                      if(!results.rows.item(i).tower){
                     //
                     //                      }
                     //                      if(!results.rows.item(i).reccurance){
                     //
                     //                      }
                     //                      if(!results.rows.item(i).Groups){
                     //
                     //                      }
                     //                      if(!results.rows.item(i).section){
                     //
                     //                      }
                     //                      if(!results.rows.item(i).taskInternalNotes){
                     //
                     //                      }
                     //                      if(!results.rows.item(i).taskExternalNotes){
                     //
                     //                      }
                     
                     
                     
                     }
                     
                     //
                     
                     },4);
            
            }
            
            
            
            var myTimeout="";
            
            debugger
//            if($scope.timerWithTimeout==0)
               $scope.buttonText="Start";
//              else
//               $scope.buttonText="Resume";
         
            
            
            
             $scope.stopped=true;
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            
            
            
            
            $scope.stop = function (){
            
            $scope.buttonText="Resume";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            $timeout.cancel(myTimeout);
            
            $scope.cancel = function(){
            
            }
            
//                   $timeout.cancel(myTimeout);
//                   $scope.cancel = function(){
//                    }
            var confirmPopup = $ionicPopup.confirm({
                                                   
                                                                                                      title: 'dPOD',
                                                                                                      template: 'Are you sure to mark this task as completed.'
                                                   
                                                                                                      });
              confirmPopup.then(function(res) {
                                
                                                              if(res) {
                                
                                  $scope.makeCompleted = true;
                                $cordovaSpinnerDialog.show("","Syncing...", true);
                                db = window.openDatabase("GedopdAppDb", "3.0", "gedopdAppDb", 5000000);
                                db.transaction(UpdateImage, errorCB ,UpdateStatus);
                                
                                
                                                              } else {
                                $scope.stopped =true;
                                
                                                              console.log('You are not sure');
                                
                                                              }
                                
                                                              });
            
            
            
            }
            
            
            $scope.showDetails=false;
            $scope.MoreandLess = function(){
            
            console.log($scope.showDetails);
            if($scope.showDetails==false)
            $scope.detailStatus = "Less Details";
            else
            $scope.detailStatus = "More Details";
            
            $scope.showDetails = !$scope.showDetails;
            
            }
            
            
            
            
            
           
            //$scope.stopped = false;
            
//            $scope.timerWithTimeout = 0;
            $scope.MintestValue = 0;
            $scope.forMintes = 0;
            $scope.startTimerWithTimeout = function() {
            debugger
            $scope.onTimeout = function(){
       
            $scope.timerWithTimeout++;
            myTimeout = $timeout($scope.onTimeout,1000);
            console.log($scope.timerWithTimeout);
            //alert(scope.timerWithTimeout==60)
            if($scope.timerWithTimeout==60)
            
            {
            debugger
               $scope.timerWithTimeout = 0;
               $scope.MintestValue = parseInt($scope.MintestValue)+1;;
            }
            
            
            }
            $scope.cancel = function(){
            
            }
            
            debugger;
            // alert($scope.stopped);
            if($scope.stopped ==true){
            $scope.StartImage = 'img/Playgreen_3x.png';
            $scope.buttonText="Pause";
            myTimeout = $timeout($scope.onTimeout,1000);
            }else{
            //            myTimeout = $timeout($scope.cancel);
            $scope.buttonText="Resume";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            $timeout.cancel(myTimeout);
            }
            
            $scope.stopped=!$scope.stopped;
            
            
            
            
            console.log('second '+myTimeout);
            
            
            };
            
            $scope.deletedImage = function(ss){
            
            
            
            var confirmPopup = $ionicPopup.confirm({
                                                   
                                            title: 'dPOD',
                                                   
                                            template: 'Are you sure you want to Delete image'
                                                   
                                                                                                      });
              confirmPopup.then(function(res) {
                                
                                                              if(res) {
                                var index = $scope.images.indexOf(ss);
                                $scope.images.splice(index, 1);
                                console.log('index valuje is '+index);
                                
                                                              } else {
                                
                                  }
                                
                                                              
                                });
            
            
            
               //alert("src file"+ss);
          
            
            
            }
            
            $scope.HomePageMove = function(){
            $scope.buttonText="Resume";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            
            $timeout.cancel(myTimeout);
            $scope.cancel = function(){
            
            }
            
            
            
            $scope.BackButton=true;
             $cordovaSpinnerDialog.show("","Syncing...", true);
            db = window.openDatabase("GedopdAppDb", "3.0", "gedopdAppDb", 5000000);
            db.transaction(UpdateImage, errorCB ,UpdateStatuss);
            
              // $state.go('menu.startOfTheDay', {reload: true});
            
            
            }
            function UpdateStatuss(){
            debugger;
            $timeout(function(){
                                                          debugger;
                                                          $cordovaSpinnerDialog.hide();
                                                          $state.go('menu.startOfTheDay', {reload: true});
                     
                                                          },10);
            }
            
            $scope.GetImage = function(){
            
            $scope.buttonText="Resume";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            $timeout.cancel(myTimeout);
            $scope.stopped =true;
            $scope.cancel = function(){
            
            }
             debugger
                       // alert(" will be open");
                        var options = {
                        quality: 75,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        targetWidth: 300,
                        targetHeight: 300,
                        popoverOptions: CameraPopoverOptions,
                        saveToPhotoAlbum: false
                        };
           
            
//            var options = {
//            quality: 75,
//            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//            allowEdit: true,
//            encodingType: Camera.EncodingType.JPEG,
//            targetWidth: 300,
//            targetHeight: 300,
//            popoverOptions: CameraPopoverOptions,
//            saveToPhotoAlbum: false
//            };
           
            
            $cordovaCamera.getPicture(options).then(function (imageData) {


                                                    
                                                   
                                                     $scope.ChooseImage = imageData;
                                                    debugger;
                                                  
                                                    if($scope.images.length <=4){
                                                    $scope.images.push(imageData);
                                                    }else{
                                                    
                                                    
                                                    var alertPopup = $ionicPopup.alert({
                                                                                       title: 'dPOD',
                                                                                       template: 'We can not take more then 5 images'
                                                                                       });
                                                    
                                                    alertPopup.then(function(res) {
                                                                    console.log('Thank you for not eating my delicious ice cream cone');
                                                                    });
                                                    
                                                    }
                                                    }, function (err) {
                                                    Console.log('Error is' + err);
                                                    });
            
            
            
            }
            
            $scope.chooseimage = function(_src){
            
            debugger;
            var name = _src;
            
            // alert('image path ****'+name);
            window.localStorage.removeItem("TurbainID");
            window.localStorage.setItem("TurbainID", $scope.unquid);
            
            
            
            BlankFactory.setValue(name);
            
            
            $state.go('imagepopover', {reload: true});
            
            
            
            
            }
            $scope.showModal = function(templateUrl) {
            $ionicModal.fromTemplateUrl(templateUrl, {
                                        scope: $scope,
                                        animation: 'slide-in-up'
                                        }).then(function(modal) {
                                                $scope.modal = modal;
                                                $scope.modal.show();
                                                });
            }
            $scope.closeModal = function() {
            $scope.modal.hide();
            $scope.modal.remove()
            };
            
        
            $scope.OpenDigiform = function(){
            
                        var confirmPopup = $ionicPopup.confirm({
                                                               
                                                          title: 'DPOD',
                                                          template: 'Are you sure you want to start Digiform App?'
                                                               
                                                                                                                  });
            
                        
            
                        confirmPopup.then(function(res) {
                                          
                                                                        if(res) {
                                          
                                                                        console.log('You have enterd digiform application');
                                          
                                                                        } else {
                                          
                                                                        console.log('You are not sure');
                                          
                                                                        }
                                          
                                                                        });
            }
            
            $scope.PostDatatoServer = function (){
            $scope.buttonText="Resume";
            $scope.StartImage = 'img/TaskInfo/Play_3x.png';
            $timeout.cancel(myTimeout);
            
            $scope.cancel = function(){
            
            }
           
           
            
            var confirmPopup = $ionicPopup.confirm({
                                                   
                                                                                                      title: 'DPOD',
                                                   
                                                                                                      template: 'Task update will be sync to the cloud.'
                                                   
                                                                                                      });
                   confirmPopup.then(function(res) {
//                                     $scope.buttonText="Start";
//                                     $scope.StartImage = 'img/TaskInfo/Play_3x.png';
//                                     $timeout.cancel(myTimeout);
//                                     
//                                     $scope.cancel = function(){
//                                     
//                                     }
                                                                        if(res) {
                                          $cordovaSpinnerDialog.show("","Syncing..", true);
         db = window.openDatabase("GedopdAppDb", "3.0", "gedopdAppDb", 5000000);
                                          db.transaction(UpdateImage, errorCB ,UpdateStatus);
                                          
                                          
                                                                        } else {
                                     
                                     debugger;
                                     $scope.stopped =true;
//                                     $scope.StartImage = 'img/Playgreen_3x.png';
//                                     $scope.buttonText="Pause";
                                     
                                     
                                     
                                      // myTimeout = $timeout($scope.onTimeout,1000);
                                          
                                                                        console.log('You are not sure');
                                          
                                                                        }
                                          
                                                                   });
            }
            
            
            
            
            
            function UpdateStatus(){
            // alert('Updated Task');
            
//            debugger;
//            if($scope.BackButton=true){
//                            $timeout(function(){
//                                     debugger;
//                                     $cordovaSpinnerDialog.hide();
//                                     $state.go('menu.startOfTheDay', {reload: true});
//                                     
//                                     },10);
//            
//            }else{
            $timeout(function(){
                     debugger;
                     $cordovaSpinnerDialog.hide();
                     $state.go('menu.startOfTheDay', {reload: true});
                     
                     },5000);
            
            }
            
             var AllImagesUpdate = [];
            function UpdateImage(tx){
         
            
            
//            $timeout.cancel(myTimeout);
//            
//            $scope.cancel = function(){
//            
//            }
            
            
            
           // var imagepath = document.getElementById("smallImage").src;
            var TextAreaTexts = document.getElementById("comment-textarea").value;
            var UpdateCond = $scope.unquid;
            
            
            
            
            
            
            
            // alert("UPDATE  task_detail set taskImageUrl='"+imagepath+"',notes='"+TextAreaTexts+"' WHERE turbineNumber='"+UpdateCond+"'");
            debugger;
//            var imagepath = $scope.ChooseImage;
//            console.log('imagepath '+imagepath);
//            var fileName = imagepath.substr(imagepath.lastIndexOf('/') + 1);
//             fileName =   fileName.substr(fileName.lastIndexOf('.') + 1);
////             alert('after'+ fileName);
//            if(fileName=="jpg" || fileName =="png")
//            {
//            console.log(imagepath);
//            }else{
//            imagepath="";
//            }
            
            
           
            
//           AllImagesUpdate
            debugger;
            $scope.AllImagesUpdate=[];
            var GetImages = $scope.images;
            for(i=0;i<GetImages.length;i++){
            
            $scope.AllImagesUpdate.push(GetImages[i].substr(GetImages[i].lastIndexOf('/') + 1));
            debugger;
            }
            
            
            
            var Status="yes";
            var taskStatus="completed";
            debugger;
            var Timeris = $scope.MintestValue +':'+$scope.timerWithTimeout;
            
           
            
            
            
            
            if($scope.makeCompleted==true)
            {
              tx.executeSql("UPDATE  task_detail set  taskImageUrl='"+JSON.stringify($scope.AllImagesUpdate)+"',timer='"+Timeris+"',taskStatus='"+taskStatus+"',notes='"+TextAreaTexts+"' WHERE turbineNumber='"+UpdateCond+"'");
            }else if($scope.BackButton==true){
            
 tx.executeSql("UPDATE  task_detail set  taskImageUrl='"+JSON.stringify($scope.AllImagesUpdate)+"',timer='"+Timeris+"',notes='"+TextAreaTexts+"' WHERE turbineNumber='"+UpdateCond+"'");
            
            }else{
            console.log('array of values is  '+JSON.stringify($scope.images));
            
               tx.executeSql("UPDATE  task_detail set  taskImageUrl='"+JSON.stringify($scope.AllImagesUpdate)+"',timer='"+Timeris+"',syncStatus='"+Status+"',taskStatus='"+taskStatus+"',notes='"+TextAreaTexts+"' WHERE turbineNumber='"+UpdateCond+"'");
            
            
            }
            
            
            
            
            
            }
            
            })

.controller('imagepopoverCtrl', function($scope,$state,$stateParams,BlankFactory) {
            $scope.ShowImagebackMove = function(){
            
            $state.go('RequestForTaskInfo', {reload: true});
            
            }
            $scope.$on('$ionicView.enter', function(){
                       $scope.loadFeeds();
                       });
            
            $scope.loadFeeds = function(){
            
            
            debugger;
            $scope.value = BlankFactory.getValue();
             debugger;
            var TuidName = window.localStorage.getItem("TurbainID");
            BlankFactory.setValue(TuidName);
            // alert('value is '+$scope.value );
            //SelectImage
            var elem = document.createElement("img");
            elem.setAttribute("height", "100%");
            elem.setAttribute("width", "100%");
            elem.setAttribute("alt", "Flower");
            elem.setAttribute("cover","-webkit-background-size");
            elem.setAttribute("cover","-moz-background-size");
            elem.setAttribute("cover","background-size");
            document.getElementById("SelectImage").appendChild(elem);
            elem.src = $scope.value;
            
            }
            
            })