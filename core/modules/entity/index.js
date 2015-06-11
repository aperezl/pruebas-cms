module.exports = function(unuko) {
	var module={};
	module.entityType = require('./entity_type')(unuko);
	var Schema = unuko.contrib.mongoose.Schema;

	module.info = function() {
		return {
			name: 'entity'
		};
	};

	module.init = function() {};

	module.new = function() {
		var entity = {};
		var _entity = {};
		_entity.fields = {};
		
		entity.define = function(ent) {
			_entity.name = ent.name;
		};

		entity.field = function(field) {
			_entity.fields[field.name] = {
				type: field.type
			};
		};

		entity.generate = function() {
			var entitySchema = new Schema(_entity.fields);
			_entity.fields._custom = {
				type: Schema.Types.Mixed
			};
			_entity.fields._created = {
				type: Date,
				default: Date.now
			};
			_entity.fields._updated = {
				type: Date,
				default: Date.now
			};

			console.log(_entity.fields);
			_entity.model = unuko.contrib.mongoose.model(_entity.name, entitySchema);
		};
		
		entity.save = function(obj, cb) {
			console.log(obj);
			var entity = new _entity.model(obj);
			entity.save(function(err, entity) {
				if(err) console.log(err);
				console.log('grabado admin');
				cb(entity);
			});
		};
		
		entity.list = function(obj, cb) {
			var query = _entity.model.find();
			query.exec(function(err, docs) {
				if(err) console.log(err);
				cb(docs);	
			});
		};
		
		entity.listLayout = function(req, res) {
			entity.list(null, function(docs) {
				console.log(docs);
			});
			var layout = unuko.modules.util.layout();
			layout.childrens['foot'].childrens['form'] = {
				name: 'main_content', 
				type: 'block', 
				content: {
					main: 'El contenido del layout'
				}
			};
			unuko.modules.util.render(layout, res);
		};
		
		entity.newForm = function(req, res) {
			var layout = unuko.modules.util.layout();
			unuko.modules.form_api.addElement({
				name: 'fieldset1',
				type: 'fieldset'
			}, req);
			for(var i in _entity.fields) {
				unuko.modules.form_api.addElement({
					parent: 'fieldset1',
					name: i,
					label: i,
					type: 'textfield',
					value: ''
				}, req);
			}
			
			layout.childrens['foot'].childrens['form'] = unuko.modules.form_api.getForm({
				name: 'frm1',
				action: '/test',
				method: 'post'
			}, req);
			unuko.modules.util.render(layout, res);
		};

		return entity;
	};

	return module;
	
};