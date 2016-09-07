var db = "";
angular.module('app', ['ionic', 'ngCordova','app.controllers', 'app.routes', 'app.services', 'app.directives', 'googlechart', 'nvd3'])

.run(function($ionicPlatform) {
     $ionicPlatform.ready(function() {
                          debugger;
                          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                          // for form inputs)
                          if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                          cordova.plugins.Keyboard.disableScroll(true);
                          }
                          if (window.StatusBar) {
                          // org.apache.cordova.statusbar required
                          StatusBar.styleDefault();
                          }
                          });
     
     db = window.openDatabase("GedopdAppDb", "3.0", "gedopdAppDb", 5000000);
     db.transaction(populateDB, errorCB, successCB);
     debugger;
     function populateDB(tx) {
     tx.executeSql('CREATE TABLE IF NOT EXISTS Login_Information(user_id INTEGER PRIMARY KEY , sso_id INTEGER, user_first_name TEXT,user_last_name TEXT, role_id INTEGER, role_name TEXT , created_by TEXT, created_date TEXT,updated_by TEXT,updated_date TEXT)');
     
     
     
     
//     tx.executeSql('DROP TABLE IF EXISTS task_detail');
     
tx.executeSql('CREATE TABLE IF NOT EXISTS task_detail (userSSO INTEGER,turbineId INTEGER,turbineNumber TEXT,turbineStatus TEXT,plannedTime INTEGER,turbineOrder INTEGER,taskHistId INTEGER,taskType TEXT,taskDescription TEXT,priority TEXT,markedAsRemoved TEXT,markedAsDone TEXT,alreadyDone TEXT,notes TEXT,faultId TEXT,externalNotes TEXT,resolutionNotes TEXT,taskId INTEGER,taskName TEXT,taskCreatedDateTime TEXT,estimatedTime INTEGER,syncStatus TEXT,taskStatus TEXT,taskDueDateTime TEXT,taskparts TEXT,techniciansNeeded INTEGER,taskRecurrence TEXT,taskGroup TEXT,taskInternalNotes TEXT,taskExternalNotes TEXT,taskImageUrl TEXT,tower TEXT,reccurance TEXT,section TEXT,Groups TEXT,timer TEXT)');
     
    
     
     
     tx.executeSql('CREATE TABLE IF NOT EXISTS task_image_detail(task_img_id INTEGER PRIMARY KEY , task_id INTEGER, task_img_path TEXT,task_img_thumnail TEXT, sync_status TEXT, sync_date_time TEXT, is_deleted TEXT, created_by TEXT, created_date TEXT,updated_by TEXT,updated_date TEXT)');
     
     
     }
     function errorCB(err) {
     
     alert("Error processing SQL: "+err.code);
     alert("Error processing  message SQL: "+err.message);
     
     }
     function successCB() {
     
     }
   
     
     
     });
