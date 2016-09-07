angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

//      .state('startOfTheDay', {
//    url: '/page1',
//    templateUrl: 'templates/startOfTheDay.html',
//    controller: 'startOfTheDayCtrl'
//  })

        .state('menu.startOfTheDay', {
               url: '/page1',
               views: {
               'side-menu21': {
               templateUrl: 'templates/startOfTheDay.html',
               controller: 'startOfTheDayCtrl',
               cache: false
               }
               }
               })
        
        
        
        
        
        
        
  .state('menu.execution', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/execution.html',
        controller: 'executionCtrl'
      }
    }
  })

  .state('menu.revision', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/revision.html',
        controller: 'revisionCtrl'
      }
    }
  })

  .state('menu.debriefing', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/debriefing.html',
        controller: 'debriefingCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })
      
//        .state('TaskInfo', {
//               url: '/page5',
//               templateUrl: 'templates/TaskInfo.html',
//               controller: 'TaskInfoCtrl'
//               })
        
        .state('RequestDogDetails', {
               url: '/page0',
               templateUrl: 'templates/login.html',
               controller: 'loginCtrl'
               })
        
        .state('RequestForTaskInfo', {
               url: '/page5',
               templateUrl: 'templates/TaskInfo.html',
               controller: 'taskInfoCtrl',
               cache: false
               })
        
       .state('imagepopover', {
               url: '/page6',
               templateUrl: 'templates/imagepopover.html',
               controller: 'imagepopoverCtrl'
               })
        
        
        

//$urlRouterProvider.otherwise('/side-menu21/page1')
        $urlRouterProvider.otherwise('/page0');

  

});