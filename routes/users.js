var express = require('express');
var router = express.Router();

/* Rendering Templates for users */
router.get('/', function(req, res) {
	if(req.session.loggeduser){
		if(req.session.IsManager){
			res.render('muser', { data : JSON.stringify(req.session.userdata), id: req.session.EmpName, template:req.session.template });	
		} else {
			res.render('nmuser', { data : JSON.stringify(req.session.userdata), id: req.session.EmpName, template:req.session.template });
		}	
	} else {
		res.redirect("/login");
	}
});

router.get('/:templates', function(req, res) {
	
	if(req.session.loggeduser){
		var db = req.db;
		var collection = db.get('userdata1');
		collection.find({EmpId : req.session.EmpId}, {}, function(e, docs) {
			var data = docs;
			if(req.session.IsManager){
				res.render('muser', { data : JSON.stringify(data), id: req.session.EmpId, template:req.session.template });	
			} else {
				res.render('nmuser', { data : JSON.stringify(data), id: req.session.EmpId, template:req.session.template });
			}
		});
	
	} else {
		res.redirect("/login");
	}
});

router.get('/logout', function(req, res) {
	req.session.loggeduser = false;
	res.render("index");
});


/* API Making For Data Manuplation.*/
router.post('/updateskills', function(req, res) {
	// Set our internal DB variable
	var db = req.db;
	var pmpuserdata = db.get('userdata1');

	// Get our form values
	var Skills = req.body;
	var LoggedId = req.session.EmpId;
	console.log(LoggedId);
	pmpuserdata.update({
		EmpId : LoggedId
	}, {
		$set : {
			Skills : {
				WebTechnologies : Skills.WebTechnology,
				MobileTechnologies : Skills.MobileTechnology,
				UserInterface : Skills.UITechnology
			}
		}
	}, function(err, docs) {
		console.log(err + "_____" + docs)
		if (err) {
			res.writeHead(503, {
				"Content-Type" : "text/plain"
			});
			res.write('503 : Error in database query.');
			res.end();
		} else {
			res.writeHead(200, {
				"Content-Type" : "text/plain"
			});
			res.write('200 : Skills Data Updated');
			res.end();
		}
	});
});

router.post('/PlanTheTraining', function(req, res) {
	// Set our internal DB variable
	var db = req.db;
	var pmpuserdata = db.get('userdata1');

	var TrainingPlan = req.body;
	var LoggedId = req.session.EmpId;
	
	pmpuserdata.update({
		EmpId : LoggedId
	}, {
		$push : {
			TrainingPlan : TrainingPlan
		}
	}, function(err, docs) {
		console.log(err + "_____" + docs)
		if (err) {
			res.writeHead(503, {
				"Content-Type" : "text/plain"
			});
			res.write('503 : Error in database query.');
			res.end();
		} else {
			res.writeHead(200, {
				"Content-Type" : "text/plain"
			});
			res.write('200 : Training Plan Updated');
			res.end();
		}
	});
});

router.post('/raiserequirement', function(req, res) {
	// Set our internal DB variable
	var db = req.db;
	var pmpuserdata = db.get('userdata1');

	// Get our form values
	var Technology = req.body.technology;
	var Number = req.body.number;
	var LoggedId = req.session.EmpId;
	var RaisedRquirementObject = {};

	var property = "RaisedRequirement." + Technology;
	RaisedRquirementObject[property] = Number;
	
	pmpuserdata.update({
		EmpId : LoggedId
	}, {
		$set : RaisedRquirementObject
	}, function(err, docs) {
		console.log(err + "_____" + docs)
		if (err) {
			res.writeHead(503, {
				"Content-Type" : "text/plain"
			});
			res.write('503 : Error in database query.');
			res.end();
		} else {
			res.writeHead(200, {
				"Content-Type" : "text/plain"
			});
			res.write('200 : Requirements Updated');
			res.end();
		}
	});
});

router.post('/onbench', function(req, res) {
	// Set our internal DB variable
	var db = req.db;
	var pmpuserdata = db.get('userdata1');

	// Get our form values
	var data = req.body;

	pmpuserdata.find({
		$and : [ {
			OnBench : "Yes"
		}, {
			Vertical : {
				$in : data
			}
		} ]

	}, function(err, docs) {
		if (err) {
			res.writeHead(503, {
				"Content-Type" : "text/plain"
			});
			res.write('503 : Error in database query.');
			res.end();
		} else {
			res.json(docs);
		}
	});
});

router.post('/updateprofile', function(req, res) {
	// Set our internal DB variable
	var db = req.db;
	var pmpuserdata = db.get('userdata1');

	// Get our form values
	var Competency = req.body.Competency;
	var Vertical = req.body.Vertical;
	var IsManager = req.body.IsManager;
	var OnBench = req.body.OnBench;
	var LoggedId = req.session.EmpId;

	pmpuserdata.update({
		EmpId : LoggedId
	}, {
		$set : {
			"Competency" : Competency,
			"OnBench" : OnBench,
			"IsManager" : IsManager,
			"Vertical" : Vertical
		}
	}, function(err, docs) {
		if (err) {
			res.writeHead(503, {
				"Content-Type" : "text/plain"
			});
			res.write('503 : Error in database query.');
			res.end();
		} else {
			res.writeHead(200, {
				"Content-Type" : "text/plain"
			});
			res.write('200 : Profile Updated');
			res.end();
		}
	});
});
var multer = require('multer');
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './resumeuploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        //console.log(req.body +"___"+ typeof req.body);
        //cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        cb(null, req.session.ResumeName + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('file');

router.post('/resumeupload', function(req, res) {
	// Set our internal DB variable
//	var db = req.db;
//	var grid = req.dbGrid;
//	var pmpuserdata = db.get('userdata1');
//	 
//	var grid = new grid();
	// Get our form values
	 upload(req,res,function(err){
         if(err){
              res.json({error_code:1,err_desc:err});
              return;
         }
          res.json({error_code:0,err_desc:null});});
});

router.post('/downloadresume', function(req, res) {
//		var fs = require('fs');
		 var file = "../app1/resumeuploads/" + req.body.EmpId + ".doc";
//		 var file = "../app1/resumeuploads/M1034122.doc";
//		 var stat = fs.statSync(file);
//
//		  var fileToSend = fs.readFileSync(file);
//
//		  res.writeHead(200, {
//		      'Content-Type': 'application/msword',
//		      'Content-Length': stat.size,
//		      'Content-Disposition': "resume"
//		  });
//		  res.end(fileToSend);
//		 res.download(file);
		 res.download(file,'resume.doc',function(err){
			 if(err){
				 console.log(err)
				 console.log(res.headerSent);
			 }else{
				 console.log("Bhej di file");
			 }
		 });
});
//	pmpuserdata.update({
//		EmpId : LoggedId
//	}, {
//		$set : {
//			"Competency" : Competency,
//			"OnBench" : OnBench,
//			"IsManager" : IsManager,
//			"Vertical" : Vertical
//		}
//	}, function(err, docs) {
//		if (err) {
//			res.writeHead(503, {
//				"Content-Type" : "text/plain"
//			});
//			res.write('503 : Error in database query.');
//			res.end();
//		} else {
//			res.writeHead(200, {
//				"Content-Type" : "text/plain"
//			});
//			res.write('200 : Profile Updated');
//			res.end();
//		}
//	});


module.exports = router;
