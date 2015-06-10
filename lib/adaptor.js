/*
 * cylon sphero adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon"),
    sphero = require("sphero");

var Commands = require("./commands");
var Events = require("./events");

var DATA_SOURCES1 = {
  motorsPWM: 0x00180000,
  imu: 0x00070000,
  accelerometer: 0x0000E000,
  gyroscope: 0x00001C00,
  motorsIMF: 0x00000060,
};

var DATA_SOURCES2 = {
  quaternion: 0xF0000000,
  odometer: 0x0C000000,
  accelOne: 0x02000000,
  velocity: 0x01800000
};

var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);

  opts = opts || {};

  this.locatorOpts = opts.locatorOpts || {};
  this.mask1 = this.mask2 = 0x00000000;

  if (this.port == null) {
    throw new Error(
      "No port specified for Sphero adaptor '" + this.name + "'. Cannot proceed"
    );
  }

  this.connector = this.sphero = sphero(this.port);
  this.proxyMethods(Commands, this.sphero, this);
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.commands = Commands;
Adaptor.prototype.events = Events;

/**
 * Connects to the Sphero
 *
 * @param {Function} callback to be triggered when connected
 * @return {void}
 */
Adaptor.prototype.connect = function(callback) {
  Cylon.Logger.info("Connecting to Sphero '" + this.name + "'...");

  this.defineAdaptorEvent({ event: "open", targetEvent: "connect" });

  this.sphero.connect(function(err) {
    if (err) {
      this.emit("error", err);
    } else {
      this.events.forEach(function(e) {
        this.defineAdaptorEvent(e);
      }.bind(this));

      callback();
    }
  }.bind(this));
};

/**
 * Disconnects from the Sphero
 *
 * @param {Function} callback to be triggered when disconnected
 * @return {void}
 */
Adaptor.prototype.disconnect = function(callback) {
  Cylon.Logger.info("Disconnecting from Sphero '" + this.name + "'...");

  this.sphero.disconnect(function() {
    callback();
  });
};

/**
 * Enables Sphero data streaming
 *
 * @param {Object} opts to be passed to sphero
 * @param {Function} callback to be triggered when done
 * @return {void}
 * @publish
 */
Adaptor.prototype.setDataStreaming = function(opts, callback) {
  opts = opts || {};

  var dataSources = opts.dataSources;

  if (dataSources) {
    dataSources.forEach(function(ds) {
      opts.mask1 |= DATA_SOURCES1[ds];
      opts.mask2 |= DATA_SOURCES2[ds];
    });
  }

  this.mask1 |= opts.mask1;
  this.mask2 |= opts.mask2;

  this.sphero.setDataStreaming(opts, callback);
};
