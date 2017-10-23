'use strict';

// Register 'composeForm' component, along with its template and controller
angular.
  module('composeForm').
  component('composeForm', {
    templateUrl: 'compose-form/compose-form.template.html',
    controller: function compseFormController($scope, $http) {

      $scope.$root.messages = []
      function getCacheData() {
        return $scope.$root.messages
      }

      $scope.message = {
        subject: $scope.subject,
        body: $scope.body
      }

      $scope.getNewMessage = (messageData) => {
        console.log($scope.message);
        $http.post('http://localhost:8082/api/messages/', $scope.message)
          .then( ()=> $scope.$root.getData() )
      }

    }
  })
