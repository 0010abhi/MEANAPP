var express = require('express');
var router = express.Router();
var waterfall = require('async-waterfall');
var nodemailer = require('nodemailer');

/* Rendering Templates for index */
router.route("/").get(function(req, res) {
	res.render('index');
});

router.route("/login").get(function(req, res) {
	res.render('index');
});

router.route("/register").get(function(req, res) {
	res.render('index');
});

router.route("/forgot").get(function(req, res) {
	res.render('index');
});


/* API Making For Data Manuplation.*/
router.get('/api/vacancy', function(req, res) {
	var db = req.db;
	var collection = db.get('userdata1');
	collection.col.group([ "EmpId", "FirstName", "LastName",
			"RaisedRequirement.AngularJS", "RaisedRequirement.NodeJS",
			"RaisedRequirement.BigData", "RaisedRequirement.DevOps" ], {}, {
		angularvacancy : 0,
		nodevacancy : 0,
		bigdatavacancy : 0,
		devopsvacancy : 0
	}, function(curr, result) {
		result.angularvacancy += curr.RaisedRequirement.AngularJS;
		result.nodevacancy += curr.RaisedRequirement.NodeJS;
		result.bigdatavacancy += curr.RaisedRequirement.BigData;
		result.devopsvacancy += curr.RaisedRequirement.DevOps;
	}, function(e, docs) {

		var specificVacancy = {
			"AngularJS" : [],
			"NodeJS" : [],
			"BigData" : [],
			"DevOps" : []
		}

		var angularTotalVacancy = 0;
		var nodeTotalVacancy = 0;
		var bigdataTotalVacancy = 0;
		var devopsTotalVacancy = 0;

		for (var i = 0; i < docs.length; i++) {
			angularTotalVacancy += docs[i].angularvacancy;
			nodeTotalVacancy += docs[i].nodevacancy;
			bigdataTotalVacancy += docs[i].bigdatavacancy;
			devopsTotalVacancy += docs[i].devopsvacancy;

			if (docs[i].angularvacancy > 0) {
				specificVacancy.AngularJS.push({
					"FirstName" : docs[i].FirstName,
					"LastName" : docs[i].LastName,
					"EmpId" : docs[i].EmpId,
					"Requirement" : docs[i].angularvacancy
				})
			}

			if (docs[i].nodevacancy > 0) {
				specificVacancy.NodeJS.push({
					"FirstName" : docs[i].FirstName,
					"LastName" : docs[i].LastName,
					"EmpId" : docs[i].EmpId,
					"Requirement" : docs[i].nodevacancy
				})
			}

			if (docs[i].bigdatavacancy > 0) {
				specificVacancy.BigData.push({
					"FirstName" : docs[i].FirstName,
					"LastName" : docs[i].LastName,
					"EmpId" : docs[i].EmpId,
					"Requirement" : docs[i].bigdatavacancy
				})
			}

			if (docs[i].devopsvacancy > 0) {
				specificVacancy.DevOps.push({
					"FirstName" : docs[i].FirstName,
					"LastName" : docs[i].LastName,
					"EmpId" : docs[i].EmpId,
					"Requirement" : docs[i].devopsvacancy
				})
			}
		}

		var document = [ {
			"Technology" : "Angular JS",
			"Vacancy" : angularTotalVacancy,
			"NeedyManagers" : specificVacancy.AngularJS
		}, {
			"Technology" : "Node JS",
			"Vacancy" : nodeTotalVacancy,
			"NeedyManagers" : specificVacancy.NodeJS
		}, {
			"Technology" : "Big Data",
			"Vacancy" : bigdataTotalVacancy,
			"NeedyManagers" : specificVacancy.BigData
		}, {
			"Technology" : "DevOps",
			"Vacancy" : devopsTotalVacancy,
			"NeedyManagers" : specificVacancy.DevOps
		}

		]

		res.json(document);
	});
});

router.get('/api/userdata', function(req, res) {
	var db = req.db;
	var collection = db.get('userdata1');
	collection.find({}, {}, function(e, docs) {
		res.json(docs);
	});
});

router.post('/api/logdata', function(req, res) {
	// Set our internal DB variable
	var db = req.db;
	var pmpuserdata = db.get('userdata1');

	// Get our form values
	var Email = req.body.email;
	var Password = req.body.password;

	pmpuserdata.find({
		Email : Email,
		Password : Password
	}, function(err, docs) {
		if (err) {
			res.writeHead(503, {
				"Content-Type" : "text/plain"
			});
			res.write('503 : unable to connect database');
			res.end();
		} else if (docs == "") {
			res.writeHead(404, {
				"Content-Type" : "text/plain"
			});
			res.write('404 : user not found');
			res.end();
		} else {
			if (docs[0].IsManager === "Yes") {
				req.session.loggeduser = true;
				req.session.IsManager = true;
				req.session.userdata = docs;
				req.session.EmpId = docs[0].EmpId;
				req.session.EmpName = docs[0].FirstName;
				res.redirect("/users");
			} else if (docs[0].IsManager === "No") {
				req.session.loggeduser = true;
				req.session.IsManager = false;
				req.session.userdata = docs;
				req.session.EmpId = docs[0].EmpId;
				req.session.ResumeName = docs[0].EmpId;
				req.session.EmpName = docs[0].FirstName;
				res.redirect("/users");
			} else {
				res.writeHead(420, {
					"Content-Type" : "text/plain"
				});
				res.write('420 : Something is wrong with user details.');
				res.end();
			}
		}
	});
});

router.post('/api/verifyemail',function(req, res, next) {
	
	var nodemailer = require('nodemailer');

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport('smtps://nirlittam.abhi@gmail.com:Or@cle!0G@smtp.gmail.com');

//	var transporter = nodemailer.createTransport("SMTP", {
//	    service: "Gmail",
//	    auth: {
//	        user: "nirlittam.abhi@gmail.com",
//	        pass: "Or@cle!0G"
//	    }
//	});
	// setup e-mail data with unicode symbols
	var token = "AuthToken";
	var text = 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n';
	text += 'Please click on the following link, or paste this into your browser to complete the process:\n\n';
	text += 'http://localhost:3000';
		//+ req.Headers.Host
	text += '/reset/' ;
	text += token;
	text += '\n\n';
	text += 'If you did not request this, please ignore this email and your password will remain unchanged.\n';
	var mailOptions = {
	    from: '"Abhishek Sachdeva" <nirlittam.abhi@gmail.com>', // sender address
	    to: '0010abhi@gmail.com', // list of receivers
	    subject: 'Reset Password', // Subject line
	    html: '<b>Make New Password</b><br/> <a>http://localhost:3000/reset</a>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	    	//console.log(error);
	        return console.log(error);
	    }
	    return console.log('Message sent: ' + info.response);
	});
//	waterfall([
//		function(done) {
//			
//			var db = req.db;
//			console.log("yeah ... came in db");
//			// Set our collection
//			var pmpuserdata = db.get('userdata1');
//
//			// Get our form values
//			var Email = req.body.email;
//			console.log("Email is : "+ Email)
//			
//			pmpuserdata.find({
//				Email : Email
//			},
//			function(err,user) {
//				
//				console.log(err +"__" + user );
//				if (err) {
//					res.writeHead(503, {
//						"Content-Type" : "text/plain"
//					});
//					res.write('503 : unable to connect database');
//					res.end();
//				} else if (user == "") {
//					res.writeHead(404, {
//						"Content-Type" : "text/plain"
//					});
//					res.write('user not found');
//					res.end();
//				}
//
//				pmpuserdata.resetPasswordToken = "ResetPassword";
//				pmpuserdata.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//				//pmpuserdata.save(function(err) {done(err,token,user);});
//				done(err,"ResetPassword",user);
//			});
//		},function(token, user, done) {
//			console.log(JSON.stringify(user));
//			
//			var smtpTransport = nodemailer
//			.createTransport(
//					'SMTP',
//					{
//						service : 'SendGrid',
//						auth : {
//							user : '0010abhi',
//							pass : 'Or@cle!0G'
//						}
//					});
//			var user = 'Abhishek.Sachdeva@mindtree.com'
//	
//				var mailOptions = {
//		to : user,
//		from : '0010abhi@gmail.com',
//		subject : 'Node.js Password Reset',
//		text : 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
//				+ 'Please click on the following link, or paste this into your browser to complete the process:\n\n'
//				+ 'http://localhost:3000'
//				//+ req.Headers.Host
//				+ '/reset/' 
//				+ token
//				+ '\n\n'
//				+ 'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//	};
//			
//	smtpTransport
//			.sendMail(
//					mailOptions,
//					function(err) {
//						console.log("err is : "+ err);
////						res.writeHead(200, {
////							"Content-Type" : "text/plain"
////						});
//						res.send('An e-mail has been sent to '
//								+ user
//								+ ' with further instructions.');
//						//res.end();
////						req
////								.flash(
////										'info',
////										);
//						done(err,'done');
//					});
//			} ], function(err) {
//		
//			if (err)
//			return next(err);
//			res.redirect('/forgot');
//			});
});

/* Post Apis For Index Page and its templates. */
router
		.post(
				'/api/newuser',
				function(req, res) {
					// Set our internal DB variable
					var db = req.db;
					var pmpuserdata = db.get('userdata1');

					// Get our form values
					var EmpId = req.body.EmpId;
					var FirstName = req.body.FirstName;
					var LastName = req.body.LastName;
					var Email = req.body.Email;
					var Password = req.body.Password;
					var IsManager = req.body.IsManager;
					if (IsManager == "Yes") {
						var BenchStatus = "No";
					} else if (IsManager == "No") {
						var BenchStatus = "Yes";
					}
					var Competency = req.body.Competency;
					var Vertical = req.body.Vertical;
					var PrimaryTech = req.body.PrimaryTech;
					var Skills = {
						"WebTechnologies" : "",
						"MobileTechnologies" : "",
						"UserInterface" : ""
					}
					var TrainingPlan = [];
					var RaisedRequirement = {
						"AngularJS" : 0,
						"NodeJS" : 0,
						"BigData" : 0,
						"DevOps" : 0
					};

					// Submit to the DB
					pmpuserdata
							.insert(
									{
										"EmpId" : EmpId,
										"FirstName" : FirstName,
										"LastName" : LastName,
										"Email" : Email,
										"Password" : Password,
										"IsManager" : IsManager,
										"Competency" : Competency,
										"Vertical" : Vertical,
										"PrimaryTech" : PrimaryTech,
										"OnBench" : BenchStatus,
										"Skills" : Skills,
										"TrainingPlan" : TrainingPlan,
										"RaisedRequirement" : RaisedRequirement
									},
									function(err, doc) {
										if (err) {
											// If it failed, return error
											res
													.send("There was a problem adding the information to the database.");
										} else {
											// And forward to success page
											res.redirect("/");
										}
									});
				});

module.exports = router;
