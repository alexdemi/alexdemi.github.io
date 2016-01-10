'use strict';

var app = angular.module("myApp", ['ngRoute']);

app.run(function ($rootScope) {
  $rootScope.clientId = "d652006c469530a4a7d6184b18e16c81";
  $rootScope.pageSize = 6;
  //SC.initialize({
  //  client_id: "d652006c469530a4a7d6184b18e16c81"
  //});
}).config(function ($routeProvider) {
  $routeProvider.otherwise(
      {
        templateUrl: "app/main.html"
      });
});
