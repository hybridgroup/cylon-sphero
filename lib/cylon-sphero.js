/*
 * cylon-sphero
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var namespace = require('node-namespace');

require('cylon');
require('./commands');
require('./adaptor');
require('./driver');

module.exports = {
  adaptor: function(opts) {
    return new Cylon.Adaptors.Sphero(opts);
  },

  driver: function(opts) {
    return new Cylon.Drivers.Sphero(opts);
  },

  register: function(robot) {
    Logger.info("Registering Sphero adaptor for " + robot.name);
    robot.registerAdaptor('cylon-sphero', 'sphero');

    Logger.info("Registering Sphero driver for " + robot.name);
    robot.registerDriver('cylon-sphero', 'sphero');
  }
};
