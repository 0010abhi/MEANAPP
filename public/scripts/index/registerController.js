angular.module("pmpApp").controller("registerController", function ($scope,$http)
{
    $scope.message = "Sign Up For Getting into Projects";

  
    $scope.newusersignup = function (userdata)
    {
    	console.log(userdata);
        $http(
        {
            method: 'POST',
            url: 'http://localhost:3000/api/newuser',
            data: userdata
        }).then(
        function successcallback(response)
        {
            alert("success");
            
        },
        function errorcallback(response)
        {
            alert("error");
        });
    }
});