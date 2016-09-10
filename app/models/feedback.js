var mongoose = require('mongoose');

var feedbackSchema = mongoose.Schema({
	survey: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Survey',
		required: true
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	answers: [{
		question: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Question',
			required: true
		},
		reply: {
			type: String,
			required: true
		},
		created_date: {
			type: Date,
			default: Date.now
		}
	}]
});

var Feedback = module.exports = mongoose.model('Feedback', feedbackSchema);

// Get Feedback
module.exports.getFeedbacks = function(surveyId, callback, limit) {
	Feedback.find().where('survey').equals(surveyId).limit(limit).exec(callback);
};

// Post Feedback
module.exports.addFeedback = function(feedback, callback) {
	Feedback.create(feedback, callback);
};

