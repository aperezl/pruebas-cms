module.exports = function(unuko) {
	var module={};
	module.entityType = require('./entity_type')(unuko);
	var Schema = unuko.contrib.mongoose.Schema;

	module.info = function() {
		return {
			name: 'entity'
		}
	}

	module.init = function() {};

	module.new = function() {
		var entity = {}
		var _entity = {};
		_entity.fields = {};
		
		entity.define = function(ent) {
			_entity.name = ent.name;
		}

		entity.field = function(field) {
			_entity.fields[field.name] = {
				type: field.type
			}
		}

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
		}
		
		entity.save = function(obj, cb) {
			console.log(obj);
			var entity = new _entity.model(obj);
			entity.save(function(err, entity) {
				if(err) console.log(err);
				console.log('grabado admin');
				cb(entity);
			});
		}
		
		entity.list = function(obj) {
			var query = _entity.model.find();
			query.exec(function(err, docs) {
				if(err) console.log(err);
				console.log(docs);		
			});
		}

		return entity;
	}

	return module;
	
}