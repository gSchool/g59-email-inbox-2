'use strict';

angular.
  module('messageApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.html5Mode(true)
      $locationProvider.hashPrefix('!')

      $routeProvider
        .when('/', {
          template:
            '<tool-bar></tool-bar>' +
            '<compose-form ng-show="$root.showForm"></compose-form>' +
            '<message-list></message-list>'
        })
    }
  ])
