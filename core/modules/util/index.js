module.exports = function(app) {
	var module = {};
	module.info = function() {
		return {
			name: 'util'
		}
	};
	module.init = function() {}

	module.layout = function() {
		var page = {
			name: 'page',
			childrens: {}
		};


		page.sections = {};
		page.zones = {};
		page.regions = {};
		page.blocks = {};

		//Creación de las secciones
		page.sections['head'] = { name: 'head', type: 'section',  content: {title: 'Bloque 1'} };
		page.sections['content'] =  { name: 'content', type: 'section',  content: {title: 'Bloque 1'} };
		page.sections['foot'] = { name: 'foot', type: 'section',  content: {title: 'Bloque 1'} };

		//Creación de las zonas
		page.zones['head_z'] = {name: 'head_z', type: 'zone', content: {}};
		page.zones['content_z'] = {name: 'content_z', type: 'zone', content: {}};
		page.zones['foot_z'] = {name: 'foot_z', type: 'zone', content: {}};

		//Creación de las regiones
		page.regions['head_r'] = {name: 'head_r', type: 'region', content: {}};
		page.regions['content_r'] = {name: 'content_r', type: 'region', content: {}};
		page.regions['foot_r'] = {name: 'foot_r', type: 'region', content: {}};

		//Colocando algún block de prueba
		page.blocks['navbar'] = {name: 'navbar', type: 'navbar', content: {}};
		page.blocks['sidebar'] = {name: 'sidebar', type: 'block', content: {main: 'Bloque 1'}};
		page.blocks['main_form'] = {name: 'main_form', type: 'block', content: {main: 'Bloque 3'}};



		//Añadir las regiones a las zonas
		page.zones['head_z'].childrens = {};
		page.zones['content_z'].childrens = {};
		page.zones['foot_z'].childrens = {};
		page.zones['head_z'].childrens['head_r'] = page.regions['head_r'];
		page.zones['content_z'].childrens['content_r'] = page.regions['content_r'];
		page.zones['foot_z'].childrens['foot_r'] = page.regions['foot_r'];


		//Añadir las zonas a las secciones
		page.sections['head'].childrens = {};
		page.sections['content'].childrens = {};
		page.sections['foot'].childrens = {};
		page.sections['head'].childrens['head_z'] = page.zones['head_z'];
		page.sections['content'].childrens['content_z'] = page.zones['content_z'];
		page.sections['foot'].childrens['foot_z'] = page.zones['foot_z'];

		//Definición de bloques
		page.blocks['navbar'] = {name: 'navbar', type: 'navbar', content: {}};
		page.blocks['sidebar'] = {name: 'sidebar', type: 'block', content: {main: 'Bloque 1'}};
		page.blocks['main'] = {name: 'main', type: 'block', content: {main: '<ul as-sortable="sortableOptions" ng-model="items"><li ng-repeat="item in items" as-sortable-item class="as-sortable-item"><div as-sortable-item-handle class="as-sortable-item-handle" style="height:50px"><span data-ng-bind="item.name"></span></div></li></ul>'}};

		//Carga de bloques en cada region
		page.regions['head_r'].childrens = {};
		page.regions['head_r'].childrens['navbar'] = page.blocks['navbar'];
		page.regions['content_r'].childrens = {};
		page.regions['content_r'].childrens['sidebar'] = page.blocks['sidebar'];
		page.regions['content_r'].childrens['main'] = page.blocks['main'];


		page.childrens = page.sections;
		//page.childrens['head'] = { name: 'head', type: 'section',  content: {title: 'Bloque 1'} };
		//page.childrens['head'].childrens = {};
		//page.childrens['head'].childrens['navbar'] = {name: 'navbar', type: 'navbar', content: {}};
		//page.childrens['content'] = { name: 'content', type: 'section',  content: {title: 'Bloque 1'} };
		//page.childrens['foot'] = { name: 'foot', type: 'section',  content: {title: 'Bloque 1'} };

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

		app.contrib.async.each(Object.keys(page.childrens),
			function(item, callback) {
				console.log('item:' + page.childrens[item]);
				if(page.childrens[item].childrens !== undefined) {
					module.pre_render(page.childrens[item], function(d) {
						var content = page.childrens[item].content || {};
						app.render(page.childrens[item].type, {childrens: d, content: content}, function(err, html) {
							if(err) console.log(err);
							output += html;
							callback();	
						});	
					});
				} else {
					app.render(page.childrens[item].type, {content: page.childrens[item].content}, function(err, html) {
						if(err) console.log(err);
						output += html;
						callback();	
					});		
				}
			},
			function(err) {
				if(err) console.log(err);
				console.log('finalizado CC');
				cb(output);
			}
		);
	}
	return module;
}