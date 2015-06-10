module.exports = function(app) {
	var module = {};
	module.info = function() {
		return {
			name: 'md2',
			deps: ['md1']
		}
	}

	module.init = function() {
		console.log('m2 iniciado');
		console.log(app.models.entity.get(4));
	}
	
	module.router = function() {
		return [
			{
				title: 'test',
				method: 'get',
				url: '/test',
				action: test
			},
			{
				title: 'test',
				method: 'post',
				url: '/test',
				action: function(req, res) {
					var layout = app.modules.util.layout();
					app.modules.util.render(layout, res);
				}
			}
		]
	}

	module.mw = function() {}

	var test = function(req, res) {
		app.modules.form_api.addElement({
			name: 'fieldset1',
			type: 'fieldset'
		});

		app.modules.form_api.addElement({
			parent: 'fieldset1',
			name: 'campo1',
			description: 'campo1',
			label: 'Campo 1',
			type: 'textfield',
			placeholder: 'Texto campo 1',
			help: 'help text for campo 1',
			value: 'Valor 1'
		});

		app.modules.form_api.addElement({
			parent: 'fieldset1',
			name: 'campo2',
			description: 'campo2',
			label: 'Campo 3',
			type: 'textfield',
			value: 'Valor 2'
		});

		app.modules.form_api.addElement({
			parent: 'fieldset1',
			name: 'campo3',
			description: 'Campo 3',
			label: 'Campo 3',
			type: 'textfield',
			value: ''
		});

		app.modules.form_api.addElement({
			parent: 'fieldset1',
			name: 'submit',
			type: 'submit'
		});


		var layout = app.modules.util.layout();
		layout.childrens['foot'].childrens['form'] = app.modules.form_api.getForm({
			name: 'frm1',
			action: '/test',
			method: 'post'
		});
		app.modules.util.render(layout, res);
		//res.send(layout);
		//res.send(app.modules.form_api.getForm());
	}

	return module;
}