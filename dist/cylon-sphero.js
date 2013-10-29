/*
 * cylon-sphero
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var Adaptor, Base, Commands, Driver, Sphero, Spheron,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = {
    adaptor: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Adaptor.Sphero, args, function(){});
    },
    driver: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Driver.Sphero, args, function(){});
    },
    register: function(robot) {
      Logger.info("Registering Sphero adaptor for " + robot.name);
      robot.registerAdaptor('cylon-sphero', 'sphero');
      Logger.info("Registering Sphero driver for " + robot.name);
      return robot.registerDriver('cylon-sphero', 'sphero');
    }
  };

  Spheron = require('spheron');

  Commands = ['roll', 'setRGB', 'detectCollisions', 'stop'];

  Base = (function() {
    function Base(opts) {
      this.self = this;
    }

    Base.prototype.commands = function() {
      return Commands;
    };

    return Base;

  })();

  Adaptor = {
    Sphero: Sphero = (function(_super) {
      var klass;

      __extends(Sphero, _super);

      klass = Sphero;

      function Sphero(opts) {
        Sphero.__super__.constructor.apply(this, arguments);
        this.connection = opts.connection;
        this.name = opts.name;
        this.sphero = Spheron.sphero();
        proxyFunctionsToObject(Commands, this.sphero, klass);
      }

      Sphero.prototype.connect = function(callback) {
        var _this = this;
        Logger.info("Connecting to Sphero '" + this.name + "'...");
        this.sphero.on('open', function() {
          return _this.connection.emit('connect', _this.self);
        });
        this.sphero.on('close', function() {
          return _this.connection.emit('disconnect', _this.self);
        });
        this.sphero.on('error', function() {
          return _this.connection.emit('error', _this.self);
        });
        this.sphero.on('data', function(data) {
          return _this.connection.emit('update', _this.self, data);
        });
        this.sphero.on('message', function(data) {
          return _this.connection.emit('message', _this.self, data);
        });
        this.sphero.on('notification', function(data) {
          return _this.connection.emit('notification', _this.self, data);
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

      Sphero.prototype.stop = function() {
        return this.sphero.roll(0, 0, 0);
      };

      return Sphero;

    })(Base)
  };

  Driver = {
    Sphero: Sphero = (function(_super) {
      var klass;

      __extends(Sphero, _super);

      klass = Sphero;

      function Sphero(opts) {
        Sphero.__super__.constructor.apply(this, arguments);
        this.device = opts.device;
        this.connection = this.device.connection;
        proxyFunctionsToObject(Commands, this.connection, klass);
      }

      Sphero.prototype.start = function(callback) {
        var _this = this;
        Logger.info("" + this.device.name + " started");
        this.connection.on('connect', function(obj) {
          return _this.device.emit('connect');
        });
        this.connection.on('message', function(obj, data) {
          return _this.device.emit('message', data);
        });
        this.connection.on('notification', function(obj, data) {
          _this.device.emit('notification', data);
          return _this.device.emit('collision', data);
        });
        return callback(null);
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

    })(Base)
  };

}).call(this);
