(function(angular) {
  'use strict';
  angular
  	.module("pmpApp", ['ngRoute','ngMaterial', 'ngFileUpload','pmpApp.user'])
  	.config(configuration);

  configuration.$inject = ['$routeProvider','$locationProvider'];
  
  function configuration($routeProvider,$locationProvider)
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
    
//    $locationProvider.html5Mode({
//        enabled: true,
//        requireBase: true
//    });
};

//app.controller("indexController", function ($scope, $http)
//{
//
//});
})(window.angular);
