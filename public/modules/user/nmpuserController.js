angular.module("pmpApp").controller(
				"nmpuserController",
				function($scope, $location, $http, $window, Upload, $mdDialog, FormModaelService, ResponseMessageService) {					
					$scope.loggedUserData = JSON.parse($("#userdata").val());

					$scope.addClass();	
					$scope.EmployeeData = $scope.loggedUserData;
					
//					 $scope.addClass = function(event){
//							var url = $location.url();
//							var temp = url.split('/');
//							var id = document.getElementById(temp[2]);
//							angular.element(id).addClass('myactive');
//							var ele = document.getElementsByClassName('sideNavOptions');
//							for(var i=0; i<ele.length; i++){
//								if(ele[i].id != temp[2]){
//									angular.element(ele[i]).removeClass('myactive');
//								}
//							}
//						}
//					$scope.addClass();
					
					// datepicker ....
					$scope.StartDate = new Date();
					$scope.EndDate = new Date();

				
					$scope.showConfirm = function(ev,data) {
						ResponseMessageService.confirm(ev,data);
						$scope.status = ResponseMessageService.status;
						console.log("111"+ResponseMessageService.status);
						console.log("222"+$scope.status);
						 
					}
//					$scope.showConfirm = function(ev,data) {
//						console.log(data);
//						var title = 'Are you sure you completed '+ data.Technology +'Training';
//						var textContent = 'From '+ $scope.convertDate(data.StartDate)+ ' to ' + $scope.convertDate(data.EndDate);
//					    // Appending dialog to document.body to cover sidenav in docs app
//					    var confirm = $mdDialog.confirm()
//					          .title(title)
//					          .textContent(textContent)
//					          .ariaLabel('Lucky day')
//					          .targetEvent(ev)
//					          .ok('Yes')
//					          .cancel('No');
//					    $mdDialog.show(confirm).then(function() {
//					      $scope.status = 'Completed';
//					    }, function() {
//					      $scope.status = 'Pending';
//					    });
//					  };
					
					$scope.minStartDate = new Date($scope.StartDate
							.getFullYear(), $scope.StartDate.getMonth() - 2,
							$scope.StartDate.getDate());
					$scope.minEndDate = new Date($scope.EndDate.getFullYear(),
							$scope.EndDate.getMonth() - 2, $scope.EndDate
									.getDate());

					$scope.maxStartDate = new Date($scope.StartDate
							.getFullYear(), $scope.StartDate.getMonth() + 2,
							$scope.StartDate.getDate());
					$scope.maxEndDate = new Date($scope.EndDate.getFullYear(),
							$scope.EndDate.getMonth() + 2, $scope.EndDate
									.getDate());
					if ($scope.StartDate.getDate > $scope.EndDate.getDate) {
						alert("invalid");
					}

					$scope.convertDate = function(dateFromDb){
						var date = new Date(dateFromDb);
						return date.toDateString();
					}
					$scope.SaveSkills = function(SkillData) {
						console.log("Skill Data Is : "
								+ JSON.stringify(SkillData));
						$http({
							method : 'POST',
							url : 'http://localhost:3000/users/updateskills',
							data : SkillData
						}).then(function successcallback(response) {
							alert("success");
						}, function errorcallback(response) {
							alert("error");
						});
					}

					$scope.PlanTheTraining = function(Technology, Start, End) {
						console.log("Training Plan Is : " + Technology + "__"
								+ Start + "__" + End);
						var TrainingPlan = {
							"Technology" : Technology,
							"StartDate" : Start,
							"EndDate" : End
						}
						$http(
								{
									method : 'POST',
									url : 'http://localhost:3000/users/PlanTheTraining',
									data : TrainingPlan
								}).then(
								function successcallback(response) {
									alert("success");
									console.log($scope.EmployeeData);
									$scope.EmployeeData[0].TrainingPlan.push(TrainingPlan);
								}, function errorcallback(response) {
									alert("error");
								});
					}

					$scope.UpdateProfile = function(ProfileData) {
						console.log("ProfileData  Is : " + ProfileData);
						$http({
							method : 'POST',
							url : 'http://localhost:3000/users/updateprofile',
							data : ProfileData
						}).then(function successcallback(response) {
							alert("success");
						}, function errorcallback(response) {
							alert("error");
						});
					}

					$scope.BooleanValue = FormModaelService.BooleanValueObject; 


					
					
					$scope.TrainingPlanTechnologies = FormModaelService.RequiredTechnologies;
					
					$scope.TrainingTech = $scope.TrainingPlanTechnologies[0].Name;
					
					$scope.Skills = {
						WebTechnology : $scope.loggedUserData[0].Skills.WebTechnologies,
						MobileTechnology : $scope.loggedUserData[0].Skills.MobileTechnologies,
						UITechnology : $scope.loggedUserData[0].Skills.UserInterface
					}

					
					$scope.uploadResume = function(resume){
						console.log("resume is ::: " + resume);
						console.table(resume);
						Upload.upload({
			                url: 'http://localhost:3000/users/resumeupload', //upload.php script, node.js route, etc..
			                data: {file: resume, 'username': $scope.loggedUserData[0].EmpId}
			                //data: {'username': $scope.loggedUserData[0].EmpId}
//			                , //Post or Put
//			                headers: {'Content-Type': 'multipart/form-data'},
//			                //withCredentials: true,
//			                data: user, //from data to send along with the file
			                //file: resume // or list of files ($files) for html5 only
//			                fileName: $scope.loggedUserData[0].EmpId // to modify the name of the file(s)                
			            }).success(function (response, status) {
			                   alert("Uploaded");
			                }
			            ).error(function (err) {
			                   alert("error");
			                }
			            );
					}
					

					$scope.submit = function() {
						$scope.fileUploadError = "";
						if ($scope.file) {
							var fileType = $scope.file.type;
//							if (fileType == "application/msword"
//									|| fileType == "application/pdf") {
								$scope.uploadResume($scope.file);
//							} else {
//								$scope.fileUploadError = "Please choose only word or pdf file formats.";
//							}
						}
					};
				});
