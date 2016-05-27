angular.module("pmpApp").controller(
		"mpuserController",
		['$scope', 
		 '$http', 
		 '$window', 
		 '$location', 
		 'FormModaelService', 
		 'ResponseMessageService',
		 function($scope, $http, $window, $location, FormModaelService, ResponseMessageService) {	
			$scope.loggedUserData = JSON.parse($("#userdata").val());
			$scope.Competencies = FormModaelService.Competencies;
			$scope.Verticals = FormModaelService.Verticals;

			$scope.addClass();	  
				$scope.RaiseRequirementOption = [ {
						name : 'Angular Js',
						value : 'AngularJS'
					}, {
						name : 'Node JS',
						value : 'NodeJS'
					}, {
						name : 'Big Data',
						value : 'BigData'
					}, {
						name : 'DevOps',
						value : 'DevOps'
					} ];
					
					$scope.requirement = {
							technology : $scope.RaiseRequirementOption[0].value,
							number: 0
					}
			
			
			 $scope.items = [ 'BFSI', 'RCM', 'TMS', 'TTH' ];
			 $scope.selected = [  ];
			 					
			 $scope.toggle = function(item, list) {
				 var idx = list.indexOf(item);
			 		if (idx > -1) {
			 							list.splice(idx, 1);
			 						} else {
			 							list.push(item);
			 						}
			 					};
			 					
			 					
			 					 
			 						
			 					$scope.exists = function(item, list) {
			 						return list.indexOf(item) > -1;
			 					};
			 					$scope.convertDate = function(dateFromDb){
			 						var date = new Date(dateFromDb);
			 						return date.toDateString();
			 					}
			 					$scope.DataRequired = function(verticals) {
			 						$http({
			 							method : 'POST',
			 							url : 'http://localhost:3000/users/onbench',
			 							data : verticals
			 						}).then(function successcallback(response) {
			 							console.log(response.data);
			 								$scope.BenchData = response.data;		
			 						}, function errorcallback(response) {
			 							alert("error");
			 							console.log("Err res" + JSON.stringify(response));
			 						})
			 					}

			 					$scope.RaiseRequirement = function(requirementData) {
			 						$http(
			 								{
			 									method : 'POST',
			 									url : 'http://localhost:3000/users/raiserequirement',
			 									data : requirementData
			 								}).then(function successcallback(response) {
			 							var Message = ResponseMessageService.RequirementUpdation;
			 							$scope.loggedUserData[0].RaisedRequirement[requirementData.technology] = requirementData.number;
			 						}, function errorcallback(response) {
			 							alert("error");
			 							console.log("Err res" + JSON.stringify(response));
			 						});
			 					}

			 					$scope.UpdateProfile = function(ProfileData,Event) {
			 						console.log("ProfileData  Is : " + ProfileData);
			 						$http({
			 							method : 'POST',
			 							url : 'http://localhost:3000/users/updateprofile',
			 							data : ProfileData
			 						}).then(function successcallback(response) {
			 							
			 							var Message = "Updated";
			 							ResponseMessageService.alert(Event,Message);
			 						}, function errorcallback(response) {
			 							$scope.Message = "Error !";
			 						});
			 					}
			 					
			 					$scope.BooleanValue = FormModaelService.BooleanValueObject;


			 					
			 								 					

			 					$scope.PassDataToModal = function(Data) {
			 						$scope.SpecificData = Data;
			 					}
			 					
			 					$scope.downloadResume = function(EmpId){
			 						$http({
			 							method : 'Post',
			 							url : 'http://localhost:3000/users/downloadresume',
			 							data : {EmpId : EmpId}
			 						}).then(function successcallback(response) {
			 							console.table(response);							
			 							var blob = new Blob([response.data], {type: "application/msword"});
			 							url = window.URL.createObjectURL( blob );    
			 							 var fileName = "resume.doc";
			 						        // Create link.
			 						        a = document.createElement( "a" );
			 						        // Set link on DOM.
			 						        document.body.appendChild( a );
			 						        // Set link's visibility.
			 						        a.style = "display: none";
			 						        // Set href on link.
			 						        a.href = url;
			 						        // Set file name on link.
			 						        a.download = fileName;
			 						        // Trigger click of link.
			 						        a.click();
			 						        // Clear.
			 						        window.URL.revokeObjectURL( url );
			 						}, function errorcallback(response) {
			 							alert("error");
			 						});
			 					}
			 				}]);
