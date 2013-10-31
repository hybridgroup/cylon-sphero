/*
 * cylon sphero adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var Colors, Spheron, namespace,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('./cylon-sphero');

  Spheron = require('spheron');

  Colors = require('./colors');

  namespace = require('node-namespace');

  namespace("Cylon.Adaptor", function() {
    return this.Sphero = (function(_super) {
      __extends(Sphero, _super);

      function Sphero(opts) {
        Sphero.__super__.constructor.apply(this, arguments);
        this.connection = opts.connection;
        this.name = opts.name;
        this.sphero = Spheron.sphero();
        this.connector = this.sphero;
        this.proxyMethods(Cylon.Sphero.Commands, this.sphero, Sphero);
      }

      Sphero.prototype.commands = function() {
        return Cylon.Sphero.Commands;
      };

      Sphero.prototype.connect = function(callback) {
        Logger.info("Connecting to Sphero '" + this.name + "'...");
        this.createAdaptorEvent({
          on: 'open',
          emit: 'connect',
          emitUpdate: true
        });
        this.createAdaptorEvent({
          on: 'close',
          emit: 'disconnect',
          emitUpdate: true
        });
        this.proxyAdaptorEvent({
          on: 'error',
          emitUpdate: true
        });
        this.proxyAdaptorEvent({
          on: 'data',
          emitUpdate: true
        });
        this.proxyAdaptorEvent({
          on: 'message',
          emitUpdate: true
        });
        this.proxyAdaptorEvent({
          on: 'notification',
          emitUpdate: true
        });
        this.sphero.open(this.connection.port.toString());
        return callback(null);
      };

      Sphero.prototype.disconnect = function() {
        Logger.info("Disconnecting from Sphero '" + this.name + "'...");
        return this.sphero.close;
      };

      Sphero.prototype.detectCollisions = function() {
        return this.sphero.configureCollisionDetection(0x01, 0x40, 0x40, 0x50, 0x50, 0x50);
      };

      Sphero.prototype.setRGB = function(color, persist) {
        return this.sphero.setRGB(color, persist);
      };

      Sphero.prototype.setColor = function(color, persist) {
        if (persist == null) {
          persist = true;
        }
        if (typeof color === 'string') {
          color = Colors.fromString(color);
        }
        return this.setRGB(color, persist);
      };

      Sphero.prototype.setRandomColor = function(persist) {
        var color;
        if (persist == null) {
          persist = true;
        }
        color = Colors.randomColor();
        return this.setRGB(color, persist);
      };

      Sphero.prototype.stop = function() {
        return this.sphero.roll(0, 0, 0);
      };

      return Sphero;

    })(Cylon.Basestar);
  });

}).call(this);
