# Cylon.js For Sphero

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This module provides an adaptor and driver for the Sphero robot from Orbotix (http://www.gosphero.com/). It uses the Hybrid Group fork of the Spheron module (https://github.com/hybridgroup/spheron) originally created by [@alchemycs](https://github.com/alchemycs)

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

## How To Calibrate Sphero

You might want to calibrate the orientation of the Sphero so that it is pointed 'forward'. There are 2 functions that have been added to the Sphero driver to help with this.

Call `startCalibration()` to put the Sphero into 'calibration mode' by turning on the tail LED and turning off the auto-stablization. You can now manually turn the Sphero to so the tail LED is pointed to the rear of the direction in which you want the Sphero to go.

Call `finishCalibration()` to turn off 'calibration mode' by turning off the tail LED and turning back on the auto-stablization. Whichever direction that the tail LED was pointed, is now the rear direction for the Sphero.

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & Lint and test your code using [Grunt](http://gruntjs.com/).
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

Version 0.19.0 - Compatibility with Cylon 1.0.0

Version 0.18.0 - Compatibility with Cylon 0.22.0

Version 0.17.0 - Compatibility with Cylon 0.21.0

Version 0.16.0 - Compatibility with Cylon 0.20.0

Version 0.15.0 - Compatibility with Cylon 0.19.0

Version 0.14.1 - Fix disconnect bug

Version 0.14.0 - Compatibility with Cylon 0.18.0

Version 0.13.0 - Added `rebeccapurple` as a supported color. Thanks to
                 [@juliancheal](https://github.com/juliancheal) for the PR.

Version 0.12.0 - Compatibility with Cylon 0.16.0

Version 0.11.2 - Added setDataStreamming, updated test coverage.

Version 0.11.1 - Add peerDependencies to package.json

Version 0.11.0 - Compatibility with Cylon 0.15.0

Version 0.10.0 - Compatibility with Cylon 0.14.0, remove node-namespace.

Version 0.9.1 - Added new 'locator' event, changed spheron to hybridgroup-spheron module

Version 0.9.0 - Update for cylon 0.12.0

Version 0.8.1 - Update dependencies to include npm version of Spheron with Cylon.js pull requests

Version 0.8.0 - Update for cylon 0.11.0, migrated to pure JS

Version 0.7.0 - Update for cylon 0.10.0, add calibration commands

Version 0.6.0 - Update for cylon 0.9.0

Version 0.5.0 - Update to match new Spheron module's callback and for cylon 0.8.0

Version 0.4.0 - Update for cylon 0.7.0

Version 0.3.0 - Use new Basestar proxying and events

Version 0.2.0 - Lots of colors, support for entire Sphero API, and uses Basestar for DRY code

Version 0.1.0 - Initial release for ongoing development

## License
Copyright (c) 2013-2014 The Hybrid Group. Licensed under the Apache 2.0 license.
