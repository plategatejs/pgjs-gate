var express = require('express'),
    config = require('config'),
    sys = require('sys'),
    exec = require('child_process').exec;

var properties = {
    gateOpenTime : config.get('gate.openTime'),
    openGateScript: config.get('scripts.openGate'),
    closeGateScript: config.get('scripts.closeGate'),
    port: config.get('server.port')
};

function pipeOut(error, stdout, stderr) { sys.puts(stdout) }

var app = express();

app.get('/openGate/', function (req, res) {
    exec(properties.openGateScript, pipeOut);
    setTimeout(function() {
            exec(properties.closeGateScript, pipeOut);
        },
        properties.gateOpenTime
    );
    res.writeHead(200, {
        'content-type': 'text/plain',
        'cache-control': 'private, no-cache, no-store, must-revalidate',
        'expires': '0',
        'pragma': 'no-cache'
    });
    res.end('Opening!');
});

app.listen(properties.port);
