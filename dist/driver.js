/*
 * cylon sphero driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var namespace,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('./cylon-sphero');

  namespace = require('node-namespace');

  namespace("Cylon.Driver", function() {
    return this.Sphero = (function(_super) {
      __extends(Sphero, _super);

      function Sphero(opts) {
        Sphero.__super__.constructor.apply(this, arguments);
        this.device = opts.device;
        this.connection = this.device.connection;
        this.proxyMethods(Cylon.Sphero.Commands, this.connection, Sphero);
      }

      Sphero.prototype.commands = function() {
        return Cylon.Sphero.Commands;
      };

      Sphero.prototype.start = function(callback) {
        Logger.info("" + this.device.name + " started");
        this.defineDriverEvent({
          eventName: 'connect'
        });
        this.defineDriverEvent({
          eventName: 'message'
        });
        this.defineDriverEvent({
          eventName: 'update'
        });
        this.defineDriverEvent({
          eventName: 'notification'
        });
        this.defineDriverEvent({
          eventName: 'notification',
          targetEventName: 'collision'
        });
        callback(null);
        return this.device.emit('start');
      };

      Sphero.prototype.roll = function(speed, heading, state) {
        if (state == null) {
          state = 1;
        }
        return this.connection.roll(speed, heading, state);
      };

      Sphero.prototype.detectCollisions = function() {
        return this.connection.detectCollisions();
      };

      Sphero.prototype.stop = function() {
        return this.connection.stop();
      };

      Sphero.prototype.setRGB = function(color, persist) {
        if (persist == null) {
          persist = true;
        }
        return this.connection.setRGB(color, persist);
      };

      return Sphero;

    })(Cylon.Basestar);
  });

}).call(this);
