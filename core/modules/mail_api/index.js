module.exports = function(unuko) {
	var module = {};
	module.info = function() {
		return {
			name: 'mail_api',
			deps: ['form_api']
		}
	};

	module.init = function() {}

	module.router = function() {
		return [
			{
				title: 'Prueba de correo',
				method: 'get',
				url: '/mail',
				menu: 'Mail',
				action: prueba_correo
			},
			{
				title: 'Prueba de correo',
				method: 'post',
				url: '/mail',
				action: prueba_correo_submit
			}
		]
	}


	var prueba_correo = function(req, res) {
		unuko.modules.form_api.addElement({
			name: 'to',
			description: 'To',
			label: 'To',
			type: 'textfield',
			value: ''
		}, req);

		unuko.modules.form_api.addElement({
			name: 'subject',
			description: 'subject',
			label: 'Subject',
			type: 'textfield',
			value: ''
		}, req);
		
		unuko.modules.form_api.addElement({
			name: 'body',
			description: 'Body',
			label: 'Body',
			type: 'textarea',
			value: ''
		}, req);

		unuko.modules.form_api.addElement({
			name: 'submit',
			type: 'submit'
		}, req);

		var layout = unuko.modules.util.layout();
		layout.childrens['foot'].childrens['form'] = unuko.modules.form_api.getForm({
			name: 'frm1',
			action: '/mail',
			method: 'post',
		}, req);
		
		unuko.modules.util.render(layout, res);
	}

	var prueba_correo_submit = function(req, res) {
		console.log(req.body);
		var transporter = unuko.contrib.nodemailer.createTransport();
		transporter.sendMail({
		    from: 'info@unuko.com',
		    to: req.body.to,
		    subject: req.body.subject,
		    text: req.body.body
		});
		res.redirect('/mail');
	}

	return module;
}