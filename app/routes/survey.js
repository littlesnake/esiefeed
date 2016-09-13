var express = require('express');
var http = require('http');
var router = express.Router();

Survey = require('../models/survey');

router.get('/surveys', function(mainreq, mainres, mainnext) {

	// Get all feedbacks received so far
	var options = {
		port: Number(process.env.PORT || 4000),
		path: '/survey/getSurveys',
		method: 'GET'
	};

	var req = http.request(options, (res) => {
		res.on('data', (data) => {
			mainres.render('pages/surveys', { 
				surveys: JSON.parse(data) 
			});
		});
	});

	req.on('error', function(e) {
		mainres.render('pages/error', {
			message: e.message,
			error: e
		});
	});

	req.end();
});

router.get('/getSurvey/:SurveyId', function(req, res, next) {
	var surveyId = req.params.SurveyId;
	Survey.getSurvey(surveyId, function(err, survey) {
		if (err) {
			throw err;
		}

		res.json(survey);
	});
});

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
