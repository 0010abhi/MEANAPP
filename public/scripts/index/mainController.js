angular.module("pmpApp").controller("mainController", function ($scope,$http)
{
	$scope.TrendingTechLoading = true;
	$http(
	        {
	            method: 'GET',
	            url: 'http://localhost:3000/api/vacancy'
	        }).then(
	        function successcallback(response)
	        {
	        	$scope.TrendingTechLoading = false;
	        	$scope.VacancyData = response.data;
	        },
	        function errorcallback(response)
	        {
	            alert("error");
	        });
	
	$scope.NeedyManagers = function(data){
		$scope.VacancyDescription = data.NeedyManagers;
		$scope.SpecificTechnology = data.Technology;
	}
	
});