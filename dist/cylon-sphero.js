/*
 * cylon-sphero
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var Adaptor, Driver, Sphero, Spheron,
    __slice = [].slice;

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
      console.log("Registering Sphero adaptor for " + robot.name);
      robot.registerAdaptor('sphero', 'sphero');
      console.log("Registering Sphero driver for " + robot.name);
      return robot.registerDriver('sphero', 'sphero');
    }
  };

  Spheron = require('spheron');

  Adaptor = {
    Sphero: Sphero = (function() {
      var self;

      self = Sphero;

      function Sphero(opts) {
        this.connection = opts.connection;
        this.name = opts.name;
        this.sphero = Spheron.sphero();
      }

      Sphero.prototype.connect = function() {
        console.log("Connecting to Sphero '" + this.name + "'...");
        this.sphero.open(this.connection.port);
        return self;
      };

      Sphero.prototype.disconnect = function() {
        console.log("Disconnecting from Sphero '" + this.name + "'...");
        return this.sphero.close;
      };

      return Sphero;

    })()
  };

  Driver = {
    Sphero: Sphero = (function() {
      function Sphero(opts) {
        this.device = opts.device;
      }

      return Sphero;

    })()
  };

}).call(this);
