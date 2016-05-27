angular.module("pmpApp").controller("forgotController", function ($scope, $http,$location,$window)
{
    $scope.message = "Log In";
    $scope.LogInErrorMessage = "";
    	
    $scope.VerifyEmail = function (user)
    {
    	$scope.DisableLogInForm = true;
        $http(
        {
            method: 'post',
            url: 'http://localhost:3000/api/verifyemail',
            data: user
        }).then(
        function successcallback(response)
        {
        	$scope.DisableLogInForm = false;
        	alert("Go For reset");
        	//$scope.DisableLogInForm = false;
        	//$window.location.href = '/users/' + response.data.template  + "?" + response.data.id +"&" + JSON.stringify(response.data.userdata);
        	//$window.location.href = '/users/' + response.data.template  + "?" + response.data.id +"&" + encodeURIComponent(JSON.stringify(response.data.userdata));
        	
        },
        function errorcallback(response)
        {
        	alert("email dont found");
        	console.table(response);
        	$scope.DisableLogInForm = false;
        	$scope.NotFoundMessage = response.data;
        });
    }

});
