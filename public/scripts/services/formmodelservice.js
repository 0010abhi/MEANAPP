/**
 * http://usejsdoc.org/
 */
angular.module("pmpApp").service("FormModaelService",function(){
	
	var BooleanValueObject = [ {
		name : 'Yes',
		value : 'Yes'
	}, {
		name : 'No',
		value : 'No'
	} ];
	
	
	var RequiredTechnologies = [ {
		"Name" : "Angular JS",
		"Value" : "Angular JS"
	},

	{
		"Name" : "Node JS",
		"Value" : "Node JS"
	},

	{
		"Name" : "R Programming",
		"Value" : "R Programming"
	},

	{
		"Name" : "Mean Stack",
		"Value" : "Mean Stack"
	},

	{
		"Name" : "Devops",
		"Value" : "Devops"
	},

	{
		"Name" : "Hadoop",
		"Value" : "Hadoop"
	}];
	
	var Competencies = [ {
		name : 'C1',
		value : 'C1'
	}, {
		name : 'C2',
		value : 'C2'
	}, {
		name : 'C3',
		value : 'C3'
	}, {
		name : 'C4',
		value : 'C4'
	}, {
		name : 'C5',
		value : 'C5'
	}, {
		name : 'C6',
		value : 'C6'
	}, {
		name : 'C7',
		value : 'C7'
	}, {
		name : 'C8',
		value : 'C8'
	}, {
		name : 'C9',
		value : 'C9'
	}];
	
	var Verticals = [ {
			name : 'BFSI',
				value : 'BFSI'
			}, {
				name : 'RCM',
				value : 'RCM'
			}, {
				name : 'TTH',
				value : 'TTH'
			}, {
				name : 'TMS',
				value : 'TMS'
			} ];
	
	return {
		BooleanValueObject : BooleanValueObject,
		RequiredTechnologies : RequiredTechnologies,
		Competencies : Competencies,
		Verticals : Verticals
	}
})