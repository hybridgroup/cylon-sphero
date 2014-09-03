/*
 * cylon sphero adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require('cylon'),
    Spheron = require('hybridgroup-spheron');

var Colors = require('./colors'),
    Commands = require('./commands');

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
  if (opts == null) {
    opts = {};
  }

  Adaptor.__super__.constructor.apply(this, arguments);

  this.connector = this.sphero = Spheron.sphero();
  this.locatorOpts = opts.extraParams.locatorOpts || {};
  this.mask1 = this.mask2 = 0x00000000;

  this.proxyMethods(Commands, this.sphero, this);
}

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.commands = Commands;

Adaptor.prototype.connect = function(callback) {
  Cylon.Logger.info("Connecting to Sphero '" + this.name + "'...");

  this.connector.on('open', function() {
    callback();
  });

  this.defineAdaptorEvent({
    eventName: 'close',
    targetEventName: 'disconnect'
  });

  this.defineAdaptorEvent('error');
  this.defineAdaptorEvent('message');


  this.connector.on('notification', function(packet) {
    switch (packet.ID_CODE) {
      case 0x03:
        var data = [];

        for (var i = 0; i < packet.DATA.length; i=i+2) {
          data.push(packet.DATA.readInt16BE(i));
        }

        this.connection.emit('data', data);
        break;

      case 0x07:
        if (packet.DLEN == 0x11) {
          this.connection.emit('collision', packet);
        }
    }

    this.connection.emit('notification', packet);
  }.bind(this));

  this.sphero.open(this.connection.port, function(err) {
    if (err) {
      this.connection.emit('err', err);
    }
  }.bind(this));
};

Adaptor.prototype.disconnect = function() {
  Cylon.Logger.info("Disconnecting from Sphero '" + this.name + "'...");

  var _arguments = arguments;
  this.sphero.once('write', (function() {
    this.sphero.close(function() {
      Adaptor.__super__.disconnect.apply(this, _arguments);
    }.bind(this));
  }).bind(this));

  this.sphero.roll(0,0,0);
};

Adaptor.prototype.detectCollisions = function() {
  return this.sphero.configureCollisionDetection(0x01, 0x40, 0x40, 0x50, 0x50, 0x50);
};

Adaptor.prototype.setRGB = function(color, persist) {
  if (persist == null) {
    persist = true;
  }
  return this.sphero.setRGB(color, persist);
};

Adaptor.prototype.setColor = function(color, persist) {
  if (typeof color === 'string') { color = Colors.fromString(color); }
  return this.setRGB(color, persist);
};

Adaptor.prototype.setRandomColor = function(persist) {
  return this.setRGB(Colors.randomColor(), persist);
};

Adaptor.prototype.setBackLed = function(brightness) {
  this.sphero.setBackLED(brightness || 192);
}

Adaptor.prototype.setDataStreaming = function(dataSources, opts) {
  opts = opts || {};

  var n = opts.n || 80,
      m = opts.m || 1,
      pcnt = opts.pcnt || 0;

  dataSources.forEach(function(ds) {
    this.mask1 = (DATA_SOURCES1[ds]) ? this.mask1 + DATA_SOURCES1[ds] : this.mask1;
    this.mask2 = (DATA_SOURCES2[ds]) ? this.mask2 + DATA_SOURCES2[ds] : this.mask2;
  }.bind(this));

  this.sphero.setDataStreaming(n, m, this.mask1, pcnt, this.mask2);
};

Adaptor.prototype.stop = function() {
  this.sphero.roll(0, 0, 0);
};
