var express = require('express');
var router = express.Router();

Feedback = require('../models/feedback');

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
