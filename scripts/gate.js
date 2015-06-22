#!/usr/bin/env node

var mraa = require('mraa');

var GPIO_PORT = 12;

var state = !!(process.argv[2] || false);

mraa.init();
var pin = new mraa.Gpio(GPIO_PORT);
pin.dir(mraa.DIR_OUT);
pin.write(+ state);
