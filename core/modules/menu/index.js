module.exports = function(unuko) {
	var module = {};
	var _menus = {};
	module.info = function() {
		return {
			name: 'menu'
		}
	};

	module.init = function() {
		for(var i in  unuko.modules) {
			if(unuko.modules[i].router !== undefined) {
				var r = unuko.modules[i].router();
				for(var j in r) {
					if(r[j].menu !== undefined) {
						_menus[r[j].url] = {
							name: r[j].url,
							title: r[j].menu
						}
					} 
				}
			}
		}
	};

	module.block = function() {

	}

	return module;
}