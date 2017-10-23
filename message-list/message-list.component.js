'use strict';

// Register 'messageList' component, along with its template and controller
angular.
module('messageList').
component('messageList', {
  templateUrl: 'message-list/message-list.template.html',
  controller: function MessageListController($scope, $http) {
    var self = this;

    $scope.$root.getData = function _getData() {
      $http.get('http://localhost:8082/api/messages').then(function(response) {
        self.messages = response.data._embedded.messages;
        $scope.$root.messages = self.messages
      })
    }
    $scope.$root.getData()

    function patchDB(updateData) {
    $http.patch('http://localhost:8082/api/messages/', updateData)
    .then( () => $scope.$root.getData() )
    }

    function getCacheData() {
      return $scope.$root.messages
    }

    $scope.getClassList = (messageData) => {
      let classString = ''
      if (messageData.selected) {
        classString += ' selected'
      }
      if (messageData.read) {
        classString += ' read'
      } else {
        classString += ' unread'
      }
      return classString
    }

    $scope.changeStarred = function _changeStarred(message) {
      var setStarred = {
        messageIds: [message.id],
        command: 'star'
      }
      setStarred.star = !message.starred
      patchDB(setStarred)
    }
  }
})
