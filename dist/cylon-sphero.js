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

  Commands = ['roll', 'setRGB', 'detectCollisions'];

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
      __extends(Sphero, _super);

      function Sphero(opts) {
        Sphero.__super__.constructor.apply(this, arguments);
        this.connection = opts.connection;
        this.name = opts.name;
        this.sphero = Spheron.sphero();
        this.setupCommands();
      }

      Sphero.prototype.connect = function(connection) {
        var _this = this;
        this.connection = connection;
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
        return this.self;
      };

      Sphero.prototype.disconnect = function() {
        Logger.info("Disconnecting from Sphero '" + this.name + "'...");
        return this.sphero.close;
      };

      Sphero.prototype.setupCommands = function() {
        var command, _i, _len;
        for (_i = 0, _len = Commands.length; _i < _len; _i++) {
          command = Commands[_i];
          if (typeof this.self[command] === 'function') {
            return;
          }
          this.self[command] = function() {
            var args, _ref;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            return (_ref = this.sphero)[command].apply(_ref, args);
          };
        }
      };

      Sphero.prototype.roll = function(speed, heading, state) {
        return this.sphero.roll(speed, heading, state);
      };

      Sphero.prototype.setRGB = function(color, persist) {
        return this.sphero.setRGB(color, persist);
      };

      Sphero.prototype.detectCollisions = function() {
        return this.sphero.configureCollisionDetection(0x01, 0x20, 0x20, 0x20, 0x20, 0x50);
      };

      return Sphero;

    })(Base)
  };

  Driver = {
    Sphero: Sphero = (function(_super) {
      __extends(Sphero, _super);

      function Sphero(opts) {
        Sphero.__super__.constructor.apply(this, arguments);
        this.device = opts.device;
        this.connection = this.device.connection;
        this.setupCommands();
      }

      Sphero.prototype.start = function() {
        var _this = this;
        Logger.info("started");
        this.connection.on('message', function(data) {
          return _this.device.emit('message', _this.self, data);
        });
        return this.connection.on('notification', function(data) {
          return _this.device.emit('notification', _this.self, data);
        });
      };

      Sphero.prototype.setupCommands = function() {
        var command, _i, _len;
        for (_i = 0, _len = Commands.length; _i < _len; _i++) {
          command = Commands[_i];
          if (typeof this.self[command] === 'function') {
            return;
          }
          this.self[command] = function() {
            var args, _ref;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            return (_ref = this.connection)[command].apply(_ref, args);
          };
        }
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
