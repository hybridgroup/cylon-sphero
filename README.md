# Cylon.js For Sphero

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things (IoT).

This module provides an adaptor/driver for the Sphero robot from Orbotix (http://www.gosphero.com/). It uses the Sphero.js module (https://github.com/orbotix/sphero.js) from [@orbotix](https://github.com/orbotix) thank you!

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-sphero.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-sphero) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-sphero/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-sphero) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-sphero/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-sphero)

## How to Install

Install the module with:

    $ npm install cylon cylon-sphero

## How to Use

Example of a simple program that makes the Sphero roll.

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    sphero: { adaptor: 'sphero', port: '/dev/rfcomm0' }
  },

  devices: {
    sphero: { driver: 'sphero' }
  },

  work: function(my) {
    every((1).second(), function() {
      my.sphero.roll(60, Math.floor(Math.random() * 360));
    });
  }
}).start();
```

## How to Connect

### OSX

In order to allow Cylon.js running on your Mac to access the Sphero, go to "Bluetooth > Open Bluetooth Preferences > Sharing Setup" and make sure that "Bluetooth Sharing" is checked.

Thank you to [@kopipejst](https://github.com/kopipejst) for the above connnection info.

First pair your computer and Sphero. You can do this using bluetooth preferences. (Sphero won't stay connected)

Find out serial port address by running this command:

    ls /dev/tty.Sphero*

The port will look something like this:

    /dev/tty.Sphero-BBP-AMP-SPP

Now you are ready to run the example code, be sure to update this line with the correct port:

    connections: {
      sphero: { adaptor: "sphero", port: "/dev/tty.Sphero-BBP-AMP-SPP" }
    },

### Ubuntu

Connecting to the Sphero from Ubuntu or any other Linux-based OS can be done entirely from the command line
using CylonJS CLI commands. Here are the steps.

Find the address of the Sphero, by using:

    gort bluetooth scan

Pair to Sphero using this command (substituting the actual address of your Sphero):

    gort bluetooth pair <address>

Connect to the Sphero using this command (substituting the actual address of your Sphero):

    gort bluetooth connect <address>

### Windows

You should be able to simply pair your Sphero using your normal system tray applet for Bluetooth, and then connect to the COM port that is bound to the device, such as `COM3`.

### Compatibility

The cylon-sphero module is currently compatible with Node.js versions 0.10.x thru 4.2.x.

## How To Calibrate Sphero

You might want to calibrate the orientation of the Sphero so that it is pointed 'forward'. There are 2 functions that have been added to the Sphero driver to help with this.

Call `startCalibration()` to put the Sphero into 'calibration mode' by turning on the tail LED and turning off the auto-stablization. You can now manually turn the Sphero to so the tail LED is pointed to the rear of the direction in which you want the Sphero to go.

Call `finishCalibration()` to turn off 'calibration mode' by turning off the tail LED and turning back on the auto-stablization. Whichever direction that the tail LED was pointed, is now the rear direction for the Sphero.

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-sphero/blob/master/RELEASES.md
](https://github.com/hybridgroup/cylon-sphero/blob/master/RELEASES.md
).

## License
Copyright (c) 2013-2015 The Hybrid Group. Licensed under the Apache 2.0 license.
