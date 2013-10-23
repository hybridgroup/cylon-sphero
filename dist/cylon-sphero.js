/*
 * cylon-sphero
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var Sphero, Spheron,
    __slice = [].slice;

  module.exports = {
    adaptor: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Sphero, args, function(){});
    },
    register: function(robot) {
      console.log("Registering Sphero adaptor for " + robot.name);
      return robot.registerAdaptor('sphero', 'sphero');
    }
  };

  Spheron = require('spheron');

  Sphero = (function() {
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

  })();

}).call(this);
