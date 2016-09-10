var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/reviews', function(req, res) {
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/esiefeed';

  MongoClient.connect(url, function(err, db) {
  	if (err) {
  		console.log('Unable to connect!');
  	} else {
  		console.log('Connection established!');
  		var collection = db.collection('feedbacks');
  		collection.find({}).toArray(function(err, result) {
  			if (err) {
  				res.send(err);
  			} else if (result.length) {
  				res.render('feedbacks', {
  					'feedbacks': result
  				});
  			} else {
  				res.send('No documents found!');
  			}

  			db.close();
  		});
  	}
  });
});

module.exports = router;
