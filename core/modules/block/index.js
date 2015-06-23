module.exports = function(unuko) {
	var module = {};

	module.info = function() {
		return {
			name: 'block'
		};
	};

	module.init = function() {
		console.log('gestion de bloques');
	};

	module.router = function() {
		return [
			{
				title: 'get block',
				method: 'get',
				url: '/getblock/:blockId',
				menu: 'get block',
				action: function(req, res) {
					res.render('blocks/' + req.params.blockId, {}, function(err, html) {
						res.send({html: html});
					});
				}
			}
		]
	};

	return module;

}