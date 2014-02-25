/*
 * cylon sphero adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

require('./cylon-sphero');
require('./utils');

var Spheron = require('spheron'),
    Colors = require('./colors'),
    namespace = require('node-namespace');

namespace("Cylon.Adaptors", function() {
  this.Sphero = (function(klass) {
    subclass(Sphero, klass);

    function Sphero(opts) {
      if (opts == null) { opts = {}; }

      Sphero.__super__.constructor.apply(this, arguments);

      this.sphero = Spheron.sphero();
      this.connector = this.sphero;
      this.proxyMethods(Cylon.Sphero.Commands, this.sphero, this);
    }

    Sphero.prototype.commands = function() {
      return Cylon.Sphero.Commands;
    };

    Sphero.prototype.connect = function(callback) {
      var _this = this;

      Logger.info("Connecting to Sphero '" + this.name + "'...");

      this.connector.on('open', function() {
        callback();
        _this.connection.emit('connect');
      });

      this.defineAdaptorEvent({
        eventName: 'close',
        targetEventName: 'disconnect'
      });

      this.defineAdaptorEvent({ eventName: 'error' });
      this.defineAdaptorEvent({ eventName: 'data' });
      this.defineAdaptorEvent({ eventName: 'message' });
      this.defineAdaptorEvent({ eventName: 'notification' });

      this.sphero.open(this.connection.port.toString(), function(err) {
        if (err) { _this.connection.emit('err', err); }
      });
    };

    Sphero.prototype.disconnect = function() {
      Logger.info("Disconnecting from Sphero '" + this.name + "'...");
      this.sphero.close();
    };

    Sphero.prototype.detectCollisions = function() {
      return this.sphero.configureCollisionDetection(0x01, 0x40, 0x40, 0x50, 0x50, 0x50);
    };

    Sphero.prototype.setRGB = function(color, persist) {
      if (persist == null) { persist = true; }
      return this.sphero.setRGB(color, persist);
    };

    Sphero.prototype.setColor = function(color, persist) {
      if (typeof color === 'string') { color = Colors.fromString(color); }
      return this.setRGB(color, persist);
    };

    Sphero.prototype.setRandomColor = function(persist) {
      return this.setRGB(Colors.randomColor(), persist);
    };

    Sphero.prototype.stop = function() {
      this.sphero.roll(0, 0, 0);
    };

    return Sphero;

  })(Cylon.Adaptor);
});
