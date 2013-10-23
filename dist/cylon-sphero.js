/*
 * cylon-sphero
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var Sphero,
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
      return console.log("Registering Sphero adaptor for " + robot.name);
    }
  };

  Sphero = (function() {
    var self;

    self = Sphero;

    function Sphero(opts) {
      this.name = opts.name;
    }

    Sphero.prototype.connect = function() {
      console.log("Connecting to Sphero '" + this.name + "'...");
      return self;
    };

    Sphero.prototype.disconnect = function() {
      return console.log("Disconnecting from Sphero '" + this.name + "'...");
    };

    return Sphero;

  })();

}).call(this);
