module.exports = function(unuko) {
	var module = {};
	var _count = 0;
	var _model;

	module.info = function() {
		return {
			name: 'md1'
		}
	}

	module.init = function() {
		unuko.models = unuko.models || {};
		unuko.models.entity = require('./m1_model')();
	}


	module.router = function() {
		return [
			{
				title: 'Menú 1',
				method: 'get',
				url: '/m1',
				menu: 'Menu 1',
				action: m1
			},
			{
				title: 'Menú 2',
				method: 'get',
				url: '/m2/:id',
				action: m2
			},
			{
				title: 'Listado de módulos',
				method: 'get',
				url: '/modules',
				action: function(req, res) {
					var rows = [];
					for(var i in unuko.modules) {
						var row = [];
						var info = unuko.modules[i].info();
						row.push(info.name);
						row.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed augue gravida, laoreet erat ut, iaculis nisl.');
						row.push('0.0.0');
						row.push(info.deps);
						row.push('<a class="btn btn-default" href="#">help</a>');
						row.push('<a class="btn btn-default" href="#">permissions</a>');

						rows.push(row);
					}

					var layout = unuko.modules.util.layout();
					layout.childrens['foot'].childrens['form'] = {
						name: 'main_form',
						type: 'table',
						content: {
							main: 'Bloque 3',
							headers: ['name', 'version', 'description', 'deps', 'help', 'permissions'],
							rows: rows
						}
					};
					unuko.modules.util.render(layout, res);
				}
			}
		]
	}

	module.mw = function() {
		return [
			{
				method: 'get',
				url: '*',
				action: function(req, res, next) {
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
		res.send(unuko.models.entity.get(req.params.id));
	}
	return module;
}