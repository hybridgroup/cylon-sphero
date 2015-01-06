/*
  * cylon sphero driver
  * http://cylonjs.com
  *
  * Copyright (c) 2013-2014 The Hybrid Group
  * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

var Commands = require("./commands");

var Driver = module.exports = function Driver() {
  Driver.__super__.constructor.apply(this, arguments);
  this.setupCommands(Commands);

  this.events = [
    /**
     * Emitted when the connection to the Sphero is closed
     *
     * @event disconnect
     */
    "disconnect",

    /**
     * Emitted when Sphero encounters an error
     *
     * @event error
     */
    "error",

    /**
     * Emitted when Sphero sends a message through the serial port
     *
     * @event message
     */
    "message",

    /**
     * Emitted when Sphero sends a notification through the serial port
     *
     * @event notification
     * @value packet
     */
    "notification",

    /**
     * Emitted when Sphero sends a notification through the serial port that
     * contains data
     *
     * @event data
     * @value data
     */
    "data",

    /**
     * Emitted when Sphero detects a collision
     *
     * @event collision
     */
    "collision"
  ];
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

/**
 * Starts the driver.
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 */
Driver.prototype.start = function(callback) {
  var events = ["message", "update", "notification", "collision", "data"];

  events.forEach(function(e) {
    this.defineDriverEvent(e);
  }.bind(this));

  this.connection.setTemporaryOptionFlags(0x01);

  callback();
};

/**
 * Stops the driver.
 *
 * @param {Function} callback to be triggered when halted
 * @return {null}
 */
Driver.prototype.halt = function(callback) {
  callback();
};

/**
 * Tells Sphero to roll at a specific speed, along a specific heading.
 *
 * Heading is considered relative to the last calibrated position.
 *
 * @param {Number} speed
 * @param {Number} heading
 * @param {Number} state
 * @return {null}
 * @publish
 */
Driver.prototype.roll = function(speed, heading, state) {
  if (state == null) {
    state = 1;
  }

  this.connection.roll(speed, heading, state);
};

/**
 * Tells Sphero to detect collisions, and report them.
 *
 * @return {null}
 * @publish
 */
Driver.prototype.detectCollisions = function() {
  this.connection.detectCollisions();
};

/**
 * Tells Sphero to enable sharing of locator data
 *
 * @return {null}
 * @publish
 */
Driver.prototype.detectLocator = function() {
  this.connection.detectLocator();
};

/**
 * Tells Sphero to stop in place.
 *
 * @return {null}
 * @publish
 */
Driver.prototype.stop = function() {
  this.connection.stop();
};

/**
 * Sets the color of Sphero's internal RGB LED
 *
 * @param {Number} color
 * @param {Boolean} persist
 * @return {null}
 * @publish
 */
Driver.prototype.setRGB = function(color, persist) {
  if (persist == null) {
    persist = true;
  }

  this.connection.setRGB(color, persist);
};

/**
 * Enables Sphero's tail light, and disables stabilization, to allow for
 * orientation of Sphero
 *
 * @return {null}
 * @publish
 */
Driver.prototype.startCalibration = function() {
  this.connection.setBackLED(127);
  this.connection.setStabilization(0);
};

/**
 * Resets Sphero's heading, disables the rear LED, and re-enables stabilization
 *
 * @return {null}
 * @publish
 */
Driver.prototype.finishCalibration = function() {
  this.connection.setHeading(0);
  this.connection.setBackLED(0);
  this.connection.setStabilization(1);
};
