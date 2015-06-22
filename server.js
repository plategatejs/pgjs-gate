var express = require('express'),
    config = require('config'),
    exec = require('child_process').exec;

var properties = {
    gateOpenTime : config.get('gate.openTime'),
    openGateScript: config.get('scripts.openGate'),
    closeGateScript: config.get('scripts.closeGate'),
    port: config.get('server.port')
};

var timeout;
var isOpen = false;

var closeGate = function () {
    console.log('Closing the gate.');
    isOpen = false;
    exec(properties.closeGateScript);
};

var openGate = function () {
    if (!isOpen) {
        console.log('Opening the gate.');
        exec(properties.openGateScript);
        isOpen = true;
    }

    clearTimeout(timeout);
    timeout = setTimeout(closeGate, properties.gateOpenTime);
};

var app = express();

app.get('/openGate', function (req, res) {
    console.log('Received gate opening request.');
    openGate();
});

app.listen(properties.port, function () {
    console.log('Gate control server started.');
});
