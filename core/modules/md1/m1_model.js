module.exports = function() {
	var _entities = {};
	_entities[1] = {title: 'Entity 1', content: 'Entity 1'};
	_entities[2] = {title: 'Entity 2', content: 'Entity 2'};
	_entities[3] = {title: 'Entity 3', content: 'Entity 3'};
	_entities[4] = {title: 'Entity 4', content: 'Entity 4'};
	_entities[5] = {title: 'Entity 5', content: 'Entity 5'};

	return {
		get: function(id) {
			return _entities[id];
		}
	}
}