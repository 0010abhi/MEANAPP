/**
 * http://usejsdoc.org/
 */
angular.module("pmpApp").service("ResponseMessageService", function($mdDialog) {


	
	var alertDailogueBox = function(event, message) {
		// Appending dialog to document.body to cover sidenav in docs app
		// Modal dialogs should fully cover application
		// to prevent interaction outside of dialog
		var alertBox = $mdDialog.alert().parent(
				angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true).textContent(message).ariaLabel(
						'Alert Dialog Demo').ok('OK').targetEvent(event);

		$mdDialog.show(alertBox);
	};

	var confirmDailogueBox = function(ev, data) {
		var title = 'Are you sure you completed ' + data.Technology
				+ 'Training';
		// var textContent = 'From '+ $scope.convertDate(data.StartDate)+ ' to '
		// + $scope.convertDate(data.EndDate);
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm = $mdDialog.confirm().title(title).textContent("hi")
				.ariaLabel('Lucky day').targetEvent(ev).ok('Yes').cancel('No');

		
		$mdDialog.show(confirm).then(function() {
			var status = "completed";
		}, function() {
			var status = "pending";
		});
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
	};
	


	return {
		ProfileUpdation : "Profile Updated Succesfully",
		RequirementUpdation : "Requirements Updated Succesfully",
		TrainingPlanUpdation : "Training Plan Updated Succesfully",
		SkillsUpdation : "Skills Updated Succesfully",
		ResumeUploaded : "Resume Uploaded Succesfully",
		ErrorMessage404 : "404 : Not Found",
		ErrorMessage503 : "503 : Service Unavailable",
		NoDataFound : "No Data Found",
		alert : alertDailogueBox,
		confirm : confirmDailogueBox
	}
})