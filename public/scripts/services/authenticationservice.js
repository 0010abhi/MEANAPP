///**
// * http://usejsdoc.org/
// */
//app.service("AuthenticationService",function($http){
//	return {
//		LogIn: function(logdata){
//			$http(
//			        {
//			            method: 'POST',
//			            url: 'http://localhost:3000/api/logdata',
//			            data: logdata
//			        }).then(
//			        function successcallback(response)
//			        {
//			        	$scope.DisableLogInForm = false;
//			        	$window.location.href = '/users';	
//			        },
//			        function errorcallback(response)
//			        {
//			        	$scope.DisableLogInForm = false;
//			            $scope.LogInErrorMessage = "Email or Password is wrong";
//			        });
//		}
//	}
//})