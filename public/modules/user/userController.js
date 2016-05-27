angular.module("pmpApp").controller("userController", function ($scope,$http,$window,$location)
{
	$scope.Message = "user is";
    $scope.LogOut = function() {
		$http({
			method : 'GET',
			url : 'http://localhost:3000/users/logout'
		}).then(function successcallback(response) {
			$window.location.href = "http://localhost:3000";
		}, function errorcallback(response) {
			alert("error");
		});
	}
	
    $scope.addClass = function(event){
		var url = $location.url();
		var temp = url.split('/');
		console.log(temp);
		var id = document.getElementById(temp[2]);
		angular.element(id).addClass('myactive');
		
		var ele = document.getElementsByClassName('sideNavOptions');
		for(var i=0; i<ele.length; i++){
			if(ele[i].id != temp[2]){
				angular.element(ele[i]).removeClass('myactive');
			}
		}
	}
  
});