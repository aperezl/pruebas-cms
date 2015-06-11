module.exports = function(unuko) {
	var module = {};
	var _user = {};
	
	module.info = function() {
		return {
			name: 'user'
		}
	}

	module.init = function() {
		_user = unuko.modules.entity.newEntity();
		
		_user.define({
			name: 'User'
		});
		
		_user.field({
			name: 'username',
			type: String
		});
		
		_user.field({
			name: 'password',
			type: String
		});

		_user.generate();

		unuko.models.User.save({
			username: 'admin',
			password: 'demo'
		});
	}

	return module;
}