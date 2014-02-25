/*
  * cylon sphero driver
  * http://cylonjs.com
  *
  * Copyright (c) 2013 The Hybrid Group
  * Licensed under the Apache 2.0 license.
*/


'use strict';

require('./cylon-sphero');
require('./utils');

var namespace = require('node-namespace');

namespace("Cylon.Drivers", function() {
  this.Sphero = (function(klass) {
    subclass(Sphero, klass);

    function Sphero(opts) {
      if (opts == null) { opts = {}; }

      Sphero.__super__.constructor.apply(this, arguments);
      this.proxyMethods(Cylon.Sphero.Commands, this.connection, this);
    }

    Sphero.prototype.commands = function() {
      return Cylon.Sphero.Commands;
    };

    // Public: Starts the driver.
    //
    // callback - params
    //
    // Returns null.
    Sphero.prototype.start = function() {
      this.defineDriverEvent({ eventName: 'connect' });
      this.defineDriverEvent({ eventName: 'message' });
      this.defineDriverEvent({ eventName: 'update' });
      this.defineDriverEvent({ eventName: 'notification' });

      this.defineDriverEvent({
        eventName: 'notification',
        targetEventName: 'collision'
      });

      return Sphero.__super__.start.apply(this, arguments);
    };

    // Public: This commands Sphero to roll along the provided vector. Both a speed and a
    // heading are required; the latter is considered relative to the last calibrated direction.
    //
    // speed - params
    // heading - params
    // state - params
    //
    // Returns null.
    Sphero.prototype.roll = function(speed, heading, state) {
      if (state == null) { state = 1; }
      this.connection.roll(speed, heading, state);
    };

    // Public: Sets the sphero to detect collisions and report them.
    //
    // Returns null.
    Sphero.prototype.detectCollisions = function() {
      this.connection.detectCollisions();
    };

    // Public: Stop the driver.
    //
    // Returns null.
    Sphero.prototype.stop = function() {
      this.connection.stop();
    };

    // Public: This allows you to set the RGB LED color, just pass an array containing
    // RGB hex or a string with one of the color names of the list.
    //
    // color - params
    // persist - params
    //
    // Returns null.
    Sphero.prototype.setRGB = function(color, persist) {
      if (persist == null) { persist = true; }
      this.connection.setRGB(color, persist);
    };

    // Public: Starts the calibration of the driver.
    //
    // Returns null.
    Sphero.prototype.startCalibration = function() {
      this.connection.setBackLED(127);
      this.connection.setStabilization(0);
    };

    // Public: Finish the calibration of the driver.
    //
    // Returns null.
    Sphero.prototype.finishCalibration = function() {
      this.connection.setHeading(0);
      this.connection.setBackLED(0);
      this.connection.setStabilization(1);
    };

    return Sphero;

  })(Cylon.Driver);
});
