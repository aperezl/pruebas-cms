module.exports = function(unuko) {
	var module={};
	module.entityType = require('./entity_type')(unuko);
	var Schema = unuko.contrib.mongoose.Schema;
	var entitySchema = new Schema({
		title: String,
		own: String,
		created: {type: Date, default: Date.now },
		fields: Schema.Types.Mixed
	});
	//unuko.models.Entity = unuko.contrib.mongoose.model('Entity', entitySchema);

	module.info = function() {
		return {
			name: 'entity'
		}
	}

	module.init = function() {
		console.log(module.entityType)
		module.entityType.create({name: 'node'});
		module.entityType.field('node',{
			name: 'campo1'
		});
		module.entityType.field('node',{
			name: 'campo2'
		});
		module.entityType.field('node',{
			name: 'campo3'
		});

		//module.entityType.save('node');
	};

	module.newEntity = function() {
		var entity = {}
		var _entity = {};
		_entity.fields = {};

		entity.get = function() {
			return obj;
		};

		entity.model = function() {
			return module.moduleType;
		}

		entity.define = function(ent) {
			_entity.name = ent.name;
		}

		entity.field = function(field) {
			_entity.fields[field.name] = {
				type: field.type
			}
		}

		entity.generate = function() {
			console.log('Genero el Schema');
			console.log(_entity.fields);
			var entitySchema = new Schema(_entity.fields);
			console.log('Inicializo el Schema a unuko.models');
			unuko.models[_entity.name] = unuko.contrib.mongoose.model(_entity.name, entitySchema);
		}
		

		return entity;
	}

	return module;
	
}