/*
 * cylon sphero adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon"),
    Spheron = require("hybridgroup-spheron");

var Colors = require("./colors"),
    Commands = require("./commands");

var DATA_SOURCES1 = {
  motorsPWM: 0x00180000,
  imu: 0x00070000,
  accelerometer: 0x0000E000,
  gyroscope: 0x00001C00,
  motorsIMF: 0x00000060,
};

var DATA_SOURCES2 = {
  quaternion: 0xF0000000,
  locator: 0x0C000000,
  accelOne: 0x02000000,
  velocity: 0x01800000
};

var Adaptor = module.exports = function Adaptor(opts) {
  Adaptor.__super__.constructor.apply(this, arguments);

  opts = opts || {};

  this.connector = this.sphero = Spheron.sphero();
  this.locatorOpts = opts.locatorOpts || {};
  this.mask1 = this.mask2 = 0x00000000;

  if (this.port == null) {
    throw new Error(
      "No port specified for Sphero adaptor '" + this.name + "'. Cannot proceed"
    );
  }

  this.proxyMethods(Commands, this.sphero, this);

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

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.commands = Commands;

/**
 * Connects to the Sphero
 *
 * @param {Function} callback to be triggered when connected
 * @return {null}
 */
Adaptor.prototype.connect = function(callback) {
  Cylon.Logger.info("Connecting to Sphero '" + this.name + "'...");

  this.connector.on("open", function() {
    callback();
  });

  this.defineAdaptorEvent({
    eventName: "close",
    targetEventName: "disconnect"
  });

  this.defineAdaptorEvent("error");
  this.defineAdaptorEvent("message");

  this.connector.on("notification", function(packet) {
    switch (packet.ID_CODE) {
      case 0x03:
        var data = [];

        for (var i = 0; i < packet.DATA.length; i=i+2) {
          data.push(packet.DATA.readInt16BE(i));
        }

        this.emit("data", data);
        break;

      case 0x07:
        if (packet.DLEN === 0x11) {
          this.emit("collision", packet);
        }
    }

    this.emit("notification", packet);
  }.bind(this));

  this.sphero.open(this.port, function(err) {
    if (err) {
      this.emit("err", err);
    }
  }.bind(this));
};

/**
 * Disconnects from the Sphero
 *
 * @param {Function} callback to be triggered when disconnected
 * @return {null}
 */
Adaptor.prototype.disconnect = function(callback) {
  Cylon.Logger.info("Disconnecting from Sphero '" + this.name + "'...");

  this.sphero.once("write", function() {
    this.sphero.close(function() {
      callback();
    }.bind(this));
  }.bind(this));

  this.sphero.roll(0,0,0);
};

/**
 * Enables collision detection on the Sphero.
 *
 * @return {null}
 * @publish
 */
Adaptor.prototype.detectCollisions = function() {
  this.sphero.configureCollisionDetection(0x01, 0x40, 0x40, 0x50, 0x50, 0x50);
};

/**
 * Sets the color of Sphero's internal RGB LED
 *
 * @param {Number} color
 * @param {Boolean} persist
 * @return {null}
 * @publish
 */
Adaptor.prototype.setRGB = function(color, persist) {
  if (persist == null) {
    persist = true;
  }
  return this.sphero.setRGB(color, persist);
};

/**
 * Sets the color of Sphero's internal LEDs, with support for named colors (see
 * colors.js
 *
 * @param {Number|String} color
 * @param {Boolean} persist
 * @return {null}
 * @publish
 */
Adaptor.prototype.setColor = function(color, persist) {
  if (typeof color === "string") { color = Colors.fromString(color); }
  return this.setRGB(color, persist);
};

/**
 * Sets Sphero's LED to a random color
 *
 * @param {Boolean} persist
 * @return {null}
 * @publish
 */
Adaptor.prototype.setRandomColor = function(persist) {
  return this.setRGB(Colors.randomColor(), persist);
};

/**
 * Sets the brightness of Sphero's tail LED
 *
 * @param {Number} brightness
 * @return {null}
 * @publish
 */
Adaptor.prototype.setBackLed = function(brightness) {
  this.sphero.setBackLED(brightness || 192);
};

/**
 * Enables Sphero data streaming
 *
 * @param {Number[]} dataSources
 * @param {Object} opts
 * @return {null}
 * @publish
 */
Adaptor.prototype.setDataStreaming = function(dataSources, opts) {
  opts = opts || {};

  var n = opts.n || 80,
      m = opts.m || 1,
      pcnt = opts.pcnt || 0;

  dataSources.forEach(function(ds) {
    if (DATA_SOURCES1[ds]) {
      this.mask1 = this.mask1 + DATA_SOURCES1[ds];
    }

    if (DATA_SOURCES2[ds]) {
      this.mask2 = this.mask2 + DATA_SOURCES2[ds];
    }
  }.bind(this));

  this.sphero.setDataStreaming(n, m, this.mask1, pcnt, this.mask2);
};

/**
 * Stops Sphero in place
 *
 * @return {null}
 * @publish
 */
Adaptor.prototype.stop = function() {
  this.sphero.roll(0, 0, 0);
};
