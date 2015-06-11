module.exports = function(unuko) {
	var module = {};
	var _entityType = [];

	module.create = function(obj) {
		_entityType[obj.name] = {
			name: obj.name
		};
	}

	module.field = function(entityType, field) {
		_entityType[entityType].fields = _entityType[entityType].fields || {};
		_entityType[entityType].fields[field.name] = {
			name: field.name
			//fieldType: core.fieldType.get(obj.fieldType)
		}
	}

	module.get = function(entityType) {
		return _entityType[entityType];
	}


	module.save = function(entityType) {
		var et = new unuko.models.Entity(_entityType[entityType]);
		et.save(function(err, et) {
			if(err) console.log(err);
			console.log('grabado');
			unuko.models.Entity.find(function(err, et) {
				if(err) console.log(err);
				console.log(et);
			});
		});
	}

	return module;
}