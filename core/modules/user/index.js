module.exports = function(unuko) {
	var module = {};
	var _user = {};
	
	module.info = function() {
		return {
			name: 'user'
		}
	}

	module.init = function() {
		_user = unuko.modules.entity.new();
		
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
	
	
		
		if(false) {	
			_user.save({
				username: 'demo2',
				password: '1234'
			}, function(obj) {
				console.log('grabado correctamente');
				_user.list(function(obj) {
				});
			});
		}
		
		
		/*
		unuko.models.User.save({
			username: 'admin',
			password: 'demo'
		});
		*/
	}

	return module;
}