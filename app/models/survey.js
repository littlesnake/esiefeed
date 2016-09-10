var mongoose = require('mongoose');

var surveySchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	questions: [{
		question: {
			type: String,
			required: true
		},
		created_date: {
			type: Date,
			default: Date.now
		}
	}]
});

var Survey = module.exports = mongoose.model('Survey', surveySchema);

// Get Survey
module.exports.getSurveys = function(callback, limit) {
	Survey.find(callback).limit(limit);
};

// Post Survey
module.exports.addSurvey = function(survey, callback) {
	Survey.create(survey, callback);
};

