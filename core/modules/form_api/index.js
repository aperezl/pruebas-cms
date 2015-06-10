module.exports = function(unuko) {
	var _elements = {};
	var _types = {};
	return {
		info: function() {
			return {
				name: 'form_api'
			}
		},
		init: function(){
			_types['textfield'] = {
				template: 'textfield',
				type: 'text'
			}

			_types['textarea'] = {
				template: 'textarea',
				type: 'textarea'
			}

			_types['submit'] = {
				template: 'button',
				type: 'submit'
			}
			_types['fieldset'] = {
				template: "fieldset",
				type: "fieldset"
			}
		},
		addElement: function(obj, req) {

			req.form_api = req.form_api || {};

			var element = {
				name: obj.name,
				content: {
					name: obj.name,
					description: obj.description,
					label: obj.label,
					placeholder: obj.placeholder,
					help: obj.help,
					value: obj.value,
					field: _types[obj.type]
				},
				type: _types[obj.type].template,
			}
			if(obj.parent !== undefined ) {
				req.form_api[obj.parent].childrens = req.form_api[obj.parent].childrens || {};
				req.form_api[obj.parent].childrens[obj.name] =  element;
			} else {
				req.form_api[obj.name] = element;
			}

		},
		getForm: function(obj, req) {
			var form = {
				name: 'form',
				type: 'form',
				content: obj,
				childrens: req.form_api
			}
			return form;
		}
	}
}