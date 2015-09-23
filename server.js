// Serve the files, otherwise audio won't work properly in chrome.
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080);
