module.export = function(unuko) {
	var module = {};
	var _field = [];
	module.add = function(obj) {
		_field[obj.name] = {
			name: obj.name,
			fieldType: core.fieldType.get(obj.fieldType),
			//fieldTypeControl: core.fieldTypeControl.get(obj.fieldTypeControl),
			//validation: obj.validation
		};
	}
	return module;
}