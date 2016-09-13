var express = require('express');
var http = require('http');
var feedutil = require('./feedutil.js')
var router = express.Router();

Feedback = require('../models/feedback');

router.get('/feedbacks/:SurveyId', function(mainreq, mainres, mainnext) {

	var surveyId = mainreq.params.SurveyId;

	// Get all feedbacks for the survey
	var options = {
		port: Number(process.env.PORT || 4000),
		path: '/feedback/getFeedbacks/' + surveyId,
		method: 'GET'
	};

	feedutil.makeGetRequest('/survey/getSurvey/' + surveyId, function(data) {
		var survey = JSON.parse(data);
		console.log(survey);
		var req = http.request(options, (res) => {
			res.on('data', (data) => {
				mainres.render('pages/feedbacks', { 
					survey: survey,
					feedbacks: JSON.parse(data) 
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
});

router.get('/getFeedbacks/:SurveyId', function(req, res, next) {
	var surveyId = req.params.SurveyId;
	Feedback.getFeedbacks(surveyId, function(err, feedbacks) {
		if (err) {
			throw err;
		}

		res.json(feedbacks);
	});
});

router.post('/addFeedback', function(req, res, next) {
	var feedback = req.body;
	Feedback.addFeedback(feedback, function(err, feedback) {
		if (err) {
			throw err;
		}

		res.json(feedback);
	});
});

module.exports = router;
