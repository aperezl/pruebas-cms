module.exports = function(unuko) {
	var module = {};
	var page = {
		name: 'page',
		childrens: [],
		section: {},
		zone: {},
		region: {},
		block: {}
	};

	module.info = function() {
		return {
			name: 'util'
		}
	};
	module.init = function() {

		//Creación de las secciones
		module.sections('head');
		module.sections('content');
		module.sections('foot');

		//Creación de las zonas
		module.zones('head', 'head');
		module.zones('content', 'content');
		module.zones('foot', 'foot');
		
		//Creación de las regiones
		module.regions('head', 'head');
		module.regions('sidebar', 'content');
		module.regions('main', 'content');
		module.regions('foot', 'foot');



		module.blocks('sidebar', 'sidebar',  {main: 'Bloque 1'});
		module.blocks('main', 'main', {main: '<ul as-sortable="sortableOptions" ng-model="items"><li ng-repeat="item in items" as-sortable-item class="as-sortable-item"><div as-sortable-item-handle class="as-sortable-item-handle" style="height:50px"><span data-ng-bind="item.name"></span></div></li></ul>'});

		module.attrs('head', 'section', {class: 'clase1 clase2'});

		module.attrs('head', 'zone', {class: 'zone row'});
		module.attrs('content', 'zone', {class: 'zone row'});
		module.attrs('foot', 'zone', {class: 'zone row'});

		module.attrs('head', 'region', {class: 'col-md-12'});
		module.attrs('sidebar', 'region', {class: 'col-md-4'});
		module.attrs('main', 'region', {class: 'col-md-8'});
		module.attrs('foot', 'region', {class: 'col-md-12'});


	}

	module.item = function(name, type, parent, parentType) {
		page[type][name] = {
			name: name,
			type: type,
			content: {} 
		}
		if(parent!==undefined) {
			page[parentType][parent].childrens = page[parentType][parent].childrens || [];
			page[parentType][parent].childrens.push(page[type][name]);
		} else {
			page.childrens.push(page[type][name]);
		}
	}

	module.sections = function(name) {
		module.item(name, 'section');
	}

	module.zones = function(name, parent) {
		module.item(name, 'zone', parent, 'section');
	}

	module.regions = function(name, parent) {
		module.item(name, 'region', parent, 'zone');
	}

	module.blocks = function(name, parent, content) {
		module.item(name, 'block', parent, 'region');
		page['block'][name].content = content;
	}

	module.attrs = function(name, type, attrs) {
		page[type][name]['attrs'] = attrs;
	}

	module.layout = function() {



		//page.childrens['content'].childrens = {};
		//page.childrens['content'].childrens['sidebar'] = {name: 'sidebar', type: 'block', content: {main: 'Bloque 1'}};
		//page.childrens['content'].childrens['main'] = {name: 'main', type: 'block', content: {main: '<ul as-sortable="sortableOptions" ng-model="items"><li ng-repeat="item in items" as-sortable-item class="as-sortable-item"><div as-sortable-item-handle class="as-sortable-item-handle" style="height:50px"><span data-ng-bind="item.name"></span></div></li></ul>'}};

		//page.childrens['foot'].childrens = {};
		//page.childrens['content'].childrens['main_form'] = {name: 'main_form', type: 'block', content: {main: 'Bloque 3'}};

		return page;
	};


	module.render = function(layout, res) {
		module.pre_render(layout, function(d) {
			res.render('index', {content: d});
		});
	};
	module.pre_render = function(page, cb) {
		var output = "";

		unuko.contrib.async.each(Object.keys(page.childrens),
			function(item, callback) {
				if(page.childrens[item].childrens !== undefined) {
					module.pre_render(page.childrens[item], function(d) {
						var content = page.childrens[item].content || {};
						var attrs = page.childrens[item].attrs || {};
						unuko.render(page.childrens[item].type, {childrens: d, content: content, attrs: attrs}, function(err, html) {
							if(err) console.log(err);
							output += html;
							callback();	
						});	
					});
				} else {
					unuko.render(page.childrens[item].type, {content: page.childrens[item].content, attrs: page.childrens[item].attrs}, function(err, html) {
						if(err) console.log(err);
						output += html;
						callback();	
					});		
				}
			},
			function(err) {
				if(err) console.log(err);
				cb(output);
			}
		);
	}
	return module;
}