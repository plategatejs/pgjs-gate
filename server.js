var express = require('express'),
    config = require('config'),
    fs = require('fs'),
	exec = require('child_process').exec;

var properties = {
    openGateScript: config.get('scripts.openGate'),
    closeGateScript: config.get('scripts.closeGate'),
    port: config.get('server.port')
};

var app = express();

app.get('/openGate/', function (req, res) {
	exec(openGateScript);
    res.writeHead(200, {
        'content-type': 'text/plain',
        'cache-control': 'private, no-cache, no-store, must-revalidate',
        'expires': '0',
        'pragma': 'no-cache'
    });
	res.end('Opening!');
});

app.listen(properties.port);
