/*
  * cylon sphero driver
  * http://cylonjs.com
  *
  * Copyright (c) 2013-2014 The Hybrid Group
  * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');
var Commands = require('./commands');

var Driver = module.exports = function Driver() {
  Driver.__super__.constructor.apply(this, arguments);
  this.setupCommands(Commands);
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

// Public: Starts the driver.
//
// callback - params
//
// Returns null.
Driver.prototype.start = function(callback) {
  this.defineDriverEvent({ eventName: 'message' });
  this.defineDriverEvent({ eventName: 'update' });
  this.defineDriverEvent({ eventName: 'notification' });
  this.defineDriverEvent({ eventName: 'collision' });
  this.defineDriverEvent({ eventName: 'data' });

  this.adaptor.setTemporaryOptionFlags(0x01);

  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

// Public: This commands Sphero to roll along the provided vector. Both a speed and a
// heading are required; the latter is considered relative to the last calibrated direction.
//
// speed - params
// heading - params
// state - params
//
// Returns null.
Driver.prototype.roll = function(speed, heading, state) {
  if (state == null) { state = 1; }
  this.adaptor.roll(speed, heading, state);
};

// Public: Sets the sphero to detect collisions and report them.
//
// Returns null.
Driver.prototype.detectCollisions = function() {
  this.adaptor.detectCollisions();
};

// Public: Sets the sphero to detect collisions and report them.
//
// Returns null.
Driver.prototype.detectLocator = function() {
  this.adaptor.detectLocator();
};

// Public: Stop the driver.
//
// Returns null.
Driver.prototype.stop = function() {
  this.adaptor.stop();
};

// Public: This allows you to set the RGB LED color, just pass an array containing
// RGB hex or a string with one of the color names of the list.
//
// color - params
// persist - params
//
// Returns null.
Driver.prototype.setRGB = function(color, persist) {
  if (persist == null) { persist = true; }
  this.adaptor.setRGB(color, persist);
};

// Public: Starts the calibration of the driver.
//
// Returns null.
Driver.prototype.startCalibration = function() {
  this.adaptor.setBackLED(127);
  this.adaptor.setStabilization(0);
};

// Public: Finish the calibration of the driver.
//
// Returns null.
Driver.prototype.finishCalibration = function() {
  this.adaptor.setHeading(0);
  this.adaptor.setBackLED(0);
  this.adaptor.setStabilization(1);
};
