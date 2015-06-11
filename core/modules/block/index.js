module.exports = function(unuko) {
	var module = {};

	module.info = function() {
		return {
			name: 'block'
		}
	};

	module.init = function() {
		console.log('gestion de bloques');
	};

	return module;

}