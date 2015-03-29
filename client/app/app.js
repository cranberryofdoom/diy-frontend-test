'use strict';

angular.module('diyFrontendTestApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/hivetest/731175');

    $locationProvider.html5Mode(true);
  });
