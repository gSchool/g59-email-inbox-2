'use strict';

// Register 'toolBar' component, along with its template and controller
angular.
module('toolBar').
component('toolBar', {
  templateUrl: 'tool-bar/tool-bar.template.html',
  controller: function ($http, $scope) {
    var self = this;

    $scope.$root.messages = []

    function getCacheData() {
      return $scope.$root.messages
    }

    function patchDB(updateData) {
    $http.patch('http://localhost:8082/api/messages/', updateData)
    .then( () => $scope.$root.getData() )
    }

    // $scope.addLabelSelected = 'Apply label'

    $scope.markAsRead = function _markAsRead() {
      var markThisRead = {
        messageIds: [],
        command: 'read',
        read: true
      }
      getCacheData().filter(message => message.selected)
      .map(message => {
        markThisRead.messageIds.push(message.id)
      })
      patchDB(markThisRead)
    }

    $scope.markAsUnread = function _markAsUnread() {
      var markThisUnread = {
        messageIds: [],
        command: 'read',
        read: false
      }
      getCacheData().filter(message => message.selected)
      .map(message => {
        markThisUnread.messageIds.push(message.id)
      })
      patchDB(markThisUnread)
    }

    $scope.countUnread = function _countUnread() {
      var count = 0;
      getCacheData().map(message => {
        if (!message.read) {
          count++
        }
      })
      return count
    }

    $scope.toggleAll = function _toggleAll() {
      var toggleStatus = !$scope.isAllSelected();
      getCacheData().map(message => { message.selected = toggleStatus; });
    }

    $scope.isAllSelected = function _isAllSelected() {
      return getCacheData().every(message => { return message.selected })
    }

    $scope.messageSelected = function _messageSelected() {
      return getCacheData().some(message => {
        return message.selected
      })
    }

    $scope.countSelected = function _countSelected() {
      var count = 0
      getCacheData().map(message => {
        if (message.selected) {
          count++
        }
      })
      return count
    }

    $scope.setIcon = function _setIcon() {
      let count = $scope.countSelected()
      if (count === 0) {
        return 'fa fa-square-o'
      }
      if (count === getCacheData().length) {
        return 'fa fa-check-square-o'
      }
      return 'fa fa-minus-square-o'
    }

    $scope.deleteMessage = function _deleteMessage() {
      var DeleteThis = {
        messageIds: [],
        command: 'delete'
      }
      getCacheData().filter(message => message.selected)
      .map(message => {
        DeleteThis.messageIds.push(message.id)
      })
      patchDB(DeleteThis)
  }

  $scope.removeLabel = function _removeLabel() {
    var removeThisLabel = {
      messageIds: [],
      command: 'removeLabel',
      label: $scope.removeLabelSelected
    }
    getCacheData().filter(message => message.selected)
    .map(message => {
      removeThisLabel.messageIds.push(message.id)
    })
    patchDB(removeThisLabel)

  }

  function checkLabelExist(array, evaluation) {
    return array.some(label => label === evaluation)
  }

  $scope.addLabel = function _addLabel() {
    var addThisLabel = {
      messageIds: [],
      command: 'addLabel',
      label: $scope.addLabelSelected
    }
    getCacheData().filter(message => message.selected)
    .map(message => {
      addThisLabel.messageIds.push(message.id)
    })
    patchDB(addThisLabel)
  }
}
})
