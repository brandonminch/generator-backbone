
/**
 * Module dependencies.
 */

var express = require('express')
	, cons = require('consolidate')
  , routes = require('./routes')
  , path = require('path')
  , swig = require('swig')
  , lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var app = express();

// NOTE: Swig requires some extra setup
// This helps it know where to look for includes and parent templates
swig.init({
    root: __dirname + '/views',
    allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
});

// all environments
app.engine('.html', cons.swig);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// use livereload middleware
app.use(lrSnippet);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', routes.index);

module.exports = app;