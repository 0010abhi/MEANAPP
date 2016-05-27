angular.module("pmpApp").controller("loginController", function ($scope, $http,$location,$window)
{
    $scope.message = "Log In";
    $scope.LogInErrorMessage = "";
    	
    $scope.logIn = function (logdata)
    {
    	$scope.DisableLogInForm = true;
        $http(
        {
            method: 'POST',
            url: 'http://localhost:3000/api/logdata',
            data: logdata
        }).then(
        function successcallback(response)
        {
        	$scope.DisableLogInForm = false;
        	$window.location.href = '/users#/Profile';	
        },
        function errorcallback(response)
        {
        	$scope.DisableLogInForm = false;
            $scope.LogInErrorMessage = "Email or Password is wrong";
        });
    }

});
