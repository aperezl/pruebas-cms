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

			_types['submit'] = {
				template: 'button',
				type: 'submit'
			}
			_types['fieldset'] = {
				template: "fieldset",
				type: "fieldset"
			}
		},
		addElement: function(obj) {

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
				_elements[obj.parent].childrens = _elements[obj.parent].childrens || {};
				_elements[obj.parent].childrens[obj.name] =  element;
			} else {
				_elements[obj.name] = element;
			}

		},
		getForm: function(obj) {
			var form = {
				name: 'form',
				type: 'form',
				content: obj,
				childrens: _elements
			}
			return form;
		},
		render: function() {
			var output = "";
			async.each(Object.keys(_elements), 
				function(item, callback) {
					console.log(_elements[item].type);
					app.render( _types[_elements[item].type].template, { content: _elements[item], field: _types[_elements[item].type] }, function(err, html) {
						if(err) console.log(err);
						output += html;
						callback();	
					});
				},
				function(err) {
					if(err) console.log(err);
					console.log('finalizado');
					//cb(output);
					console.log(output);
				}
			);
		}
	}
}