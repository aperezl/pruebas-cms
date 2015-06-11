var express = require('express');
var app = express();

app.contrib = {};
app.contrib.async = require('async');
app.contrib.nodemailer = require('nodemailer');
app.contrib.bodyParser = require('body-parser');
app.contrib.mongoose = require('mongoose');

app.set('view engine', 'jade');
app.locals.pretty = true;
app.set('view cache', false);

app.use(app.contrib.bodyParser.urlencoded({ extended: false }))

app.modules = {};
app.models = {};
var tmpModules = ['md2', 'md1', 'form_api', 'util', 'mail_api', 'menu', 'block', 'entity', 'user'];

app.contrib.mongoose.connect('mongodb://prueba:prueba@ds033831.mongolab.com:33831/mean');

app.contrib.mongoose.connection.on('open', function(){
	//Carga de módulos
	for(var i in tmpModules) {
		app.modules[tmpModules[i]] = require('./core/modules/' + tmpModules[i])(app);
	}

	var initModule = function(info) {
		if(info.deps !== undefined) {
			info.deps.map(function(v) {
				initModule(app.modules[v].info());
			});
		}
		app.modules[info.name].init();
	}


	//Inicialización ordenada
	for(var i in app.modules) {
		var info = app.modules[i].info();
		initModule(info);
	}

	//Cargador de mw
	for(var i in  app.modules) {
		if(app.modules[i].mw !== undefined) {
			var mw = app.modules[i].mw();
			for(var j in mw) {
				app[mw[j].method](mw[j].url, mw[j].action);
			}
		}
	}

	//Cargador de rutas
	for(var i in  app.modules) {
		if(app.modules[i].router !== undefined) {
			var r = app.modules[i].router();
			for(var j in r) {
				app[r[j].method](r[j].url, r[j].action);
			}
		}
	}
	app.listen(3000);
});
app.contrib.mongoose.connection.on('error', function(error){
  throw new Error(error);
});
