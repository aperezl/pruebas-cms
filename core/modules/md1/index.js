module.exports = function(app) {
	var module = {};
	var _count = 0;
	var _model;

	module.info = function() {
		return {
			name: 'md1'
		}
	}

	module.init = function() {
		app.models = app.models || {};
		app.models.entity = require('./m1_model')();
		console.log(app.models.entity.get(1));
	}


	module.router = function() {
		return [
			{
				title: 'Menú 1',
				method: 'get',
				url: '/m1',
				action: m1
			},
			{
				title: 'Menú 2',
				method: 'get',
				url: '/m2/:id',
				action: m2
			}
		]
	}

	module.mw = function() {
		return [
			{
				method: 'get',
				url: '*',
				action: function(req, res, next) {
					console.log('logging...' + _count);
					next();
				}
			},
			{
				method: 'get',
				url: '/m2/:id',
				action: function(req, res, next) {
					_count++;
					next();
				}
			}
		]
	}

	var m1 = function(req, res) {
		res.send('ok');
	}

	var m2 = function(req, res) {
		res.send(app.models.entity.get(req.params.id));
	}
	return module;
}