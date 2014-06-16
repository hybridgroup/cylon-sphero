/*
 * cylon-sphero
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Logger = require('cylon').Logger;

var Adaptor = require('./adaptor'),
    Driver = require('./driver');

module.exports = {
  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    return new Driver(opts);
  },

  register: function(robot) {
    Logger.info("Registering Sphero adaptor for " + robot.name);
    robot.registerAdaptor('cylon-sphero', 'sphero');

    Logger.info("Registering Sphero driver for " + robot.name);
    robot.registerDriver('cylon-sphero', 'sphero');
  }
};
