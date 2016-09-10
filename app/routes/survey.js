var express = require('express');
var router = express.Router();

Survey = require('../models/survey');

router.get('/getSurveys', function(req, res, next) {
	Survey.getSurveys(function(err, surveys) {
		if (err) {
			throw err;
		}

		res.json(surveys);
	});
});

router.post('/addSurvey', function(req, res, next) {
	var survey = req.body;
	Survey.addSurvey(survey, function(err, survey) {
		if (err) {
			throw err;
		}

		res.json(survey);
	});
});

module.exports = router;
