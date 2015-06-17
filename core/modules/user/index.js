module.exports = function(unuko) {
	var module = {};
	var _user = {};
	
	module.info = function() {
		return {
			name: 'user',
			deps: ['entity']
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


	module.router = function() {
		console.log(_user.listLayout);
		return [
			{
				title: 'User List',
				method: 'get',
				url: '/admin/users',
				menu: 'User List',
				action: _user.listLayout
			},
			{
				title: 'New User',
				method: 'get',
				url: '/admin/users/new',
				action: _user.newForm
			}
		]
	}
	return module;
}