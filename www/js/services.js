angular.module('app.services', [])

.factory('BlankFactory', [function(){
                          var value = 0;
                          
                          // public
                          return {
                          
                          getValue: function() {
                          return value;
                          },
                          
                          setValue: function(val) {
                          value = val;
                          }
                          }

}])

.service('BlankService', [function(){

}]);

