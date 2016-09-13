var http = require('http');

exports.makeGetRequest = function(path, onSuccess) {

	var options = {
		port: Number(process.env.PORT || 4000),
		path: path,
		method: 'GET'
	};

	var req = http.request(options, (res) => {
		res.on('data', function(data) {
			onSuccess(data);
		});
	});

	req.on('error', function(e) {
		mainres.render('pages/error', {
			message: e.message,
			error: e
		});
	});

	req.end();
};
