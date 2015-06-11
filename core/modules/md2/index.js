module.exports = function(app) {
	var module = {};
	module.info = function() {
		return {
			name: 'md2',
			deps: ['md1']
		}
	}

	module.init = function() {
	}
	
	module.router = function() {
		return [
			{
				title: 'test',
				method: 'get',
				url: '/test',
				menu: 'Test',
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
		}, req);

		app.modules.form_api.addElement({
			parent: 'fieldset1',
			name: 'campo1',
			description: 'campo1',
			label: 'Campo 1',
			type: 'textfield',
			placeholder: 'Texto campo 1',
			help: 'help text for campo 1',
			value: 'Valor 1'
		}, req);

		app.modules.form_api.addElement({
			parent: 'fieldset1',
			name: 'campo2',
			description: 'campo2',
			label: 'Campo 3',
			type: 'textfield',
			value: 'Valor 2'
		}, req);

		app.modules.form_api.addElement({
			parent: 'fieldset1',
			name: 'campo3',
			description: 'Campo 3',
			label: 'Campo 3',
			type: 'textfield',
			value: ''
		}, req);

		app.modules.form_api.addElement({
			parent: 'fieldset1',
			name: 'submit',
			type: 'submit'
		}, req);


		var layout = app.modules.util.layout();
		layout.childrens['foot'].childrens['form'] = app.modules.form_api.getForm({
			name: 'frm1',
			action: '/test',
			method: 'post'
		}, req);
		app.modules.util.render(layout, res);
		//res.send(layout);
		//res.send(app.modules.form_api.getForm());
	}

	return module;
}