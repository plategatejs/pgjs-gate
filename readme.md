# pgjs-gate

[PlateGateJS](https://github.com/plategatejs/pgjs-docs) module for controlling the gate.

## Summary

This module exposes two Rest Api endpoints:

* _/open_ for opening the gate 
* _/close_ for closing

Incoming requests to _/open_ will open the gate. The gate will close after 3 seconds (by default) but any following requests will reset that timeout.

Requests to _/close_ will close the gate immediately.

Opening and closing the gate is based on setting high and low states on Intel Galileo GPIO port.

## Basic setup

Node.js ~5.0.0+ and Npm are required.

```
npm install
npm start
```

## License
MIT
