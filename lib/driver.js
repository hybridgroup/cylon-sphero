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
var Events = require("./events");

var Driver = module.exports = function Driver() {
  Driver.__super__.constructor.apply(this, arguments);
  this.setupCommands(Commands);
  this.events = Events;
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.commands = Commands;
/**
 * Starts the driver.
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 */
Driver.prototype.start = function(callback) {
  var events = this.events;

  events.forEach(function(e) {
    this.defineDriverEvent(e);
  }.bind(this));

  this.connection.setTempOptionFlags(0x01);

  callback();
};

/**
 * Stops the driver.
 *
 * @param {Function} callback to be triggered when halted
 * @return {void}
 */
Driver.prototype.halt = function(callback) {
  this.connection.disconnect(function() {
    callback();
  });
};
