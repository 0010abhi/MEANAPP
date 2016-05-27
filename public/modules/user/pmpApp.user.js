/**
 * http://usejsdoc.org/
 */
(function(angular) {
  'use strict';
  angular
  	.module("pmpApp.user", ['ngMaterial', 'ngFileUpload'])
  	.config(configuration);

  configuration.$inject = ['$routeProvider','$locationProvider'];
  
  function configuration($routeProvider,$locationProvider)
  {
    $routeProvider
//    .when("/", {
//    	templateUrl: '../templates/user/Profile.html'
//        //controller: 'mpuserController'
//    })
    .when("/Profile", {
        templateUrl: '../templates/user/Profile.html',
        //controller: 'mpuserController'
    })
    .when("/SeeAvailability", {
        templateUrl: '../templates/user/SeeAvailability.html',
        //controller: 'mpuserController'
    })
    .when("/RaiseRequirement", {
        templateUrl: '../templates/user/RaiseRequirement.html',
        //controller: 'mpuserController'
    })
    .when("/TrainingPlan", {
        templateUrl: '../templates/user/TrainingPlan.html',
        //controller: 'nmpuserController'
    })
    .when("/Skills", {
        templateUrl: '../templates/user/SkillsUpdate.html',
        //controller: 'nmpuserController'
    })
    .when("/UploadResume", {
        templateUrl: '../templates/user/UploadResume.html',
        //controller: 'nmpuserController'
    }).otherwise(
            {
                redirectTo: "/Profile"
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