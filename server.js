var express = require('express'),
    config = require('config'),
    exec = require('child_process').exec;

var properties = {
    gateOpenTime : config.get('gate.openTime'),
    directControl: config.get('directControl'),
    port: config.get('server.port')
};

var mraa, pin;
if (properties.directControl) {
    properties.gpio = config.get('gpio');

    mraa = require('mraa');
    mraa.init();
    pin = new mraa.Gpio(properties.gpio);
    pin.dir(mraa.DIR_OUT);
}
else {
    properties.openGateScript = config.get('scripts.openGate');
    properties.closeGateScript = config.get('scripts.closeGate');
}

var timeout;
var isOpen = false;

var closeGate = function () {
    console.log('Closing the gate.');
    isOpen = false;

    if (properties.directControl) {
        pin.write(0);
    }
    else {
        exec(properties.closeGateScript);
    }
};

var openGate = function () {
    if (!isOpen) {
        console.log('Opening the gate.');
        isOpen = true;

        if (properties.directControl) {
            pin.write(1);
        }
        else {
            exec(properties.openGateScript);
        }
    }

    clearTimeout(timeout);
    timeout = setTimeout(closeGate, properties.gateOpenTime);
};

var app = express();

app.get('/openGate', function (req, res) {
    console.log('Received gate opening request.');
    res.end();
    openGate();
});

app.listen(properties.port, function () {
    console.log('Gate control server started.');
});
