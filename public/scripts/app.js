(function(angular) {
  'use strict';
  angular
  	.module("pmpApp", ['ngRoute','ngMaterial', 'ngFileUpload','pmpApp.user'])
  	.config(configuration);

  configuration.$inject = ['$routeProvider'];
  
  function configuration($routeProvider)
  {
    $routeProvider
        .when("/", {
            templateUrl: "templates/index/main.html",
            controller: "mainController"
        })
        .when("/login", {
            templateUrl: "templates/index/login.html",
            controller: "loginController"
        })
        .when("/register", {
            templateUrl: 'templates/index/register.html',
            controller: 'registerController'
        })
        .when("/forgot", {
            templateUrl: 'templates/index/forgot.html',
            controller: 'forgotController'
        })
        .otherwise(
        {
            redirectTo: "/"
        });

  }

})(window.angular);
