'use strict';
var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	errorhandler = require('errorhandler');
//	favicon = ('serve-favicon');

var app = express();

app.set('port', process.env.PORT || 3000);
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

if(app.get('env') === 'development') {
	  app.use(errorhandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
	console.log('Listening on port ' + app.get('port'));
});

