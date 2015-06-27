"use strict";

var Adaptor = require("./lib/adaptor"),
    Driver = require("./lib/driver");

module.exports = {
  adaptors: ["sphero"],
  drivers: ["sphero"],

  adaptor: function(opts) {
    return new Adaptor(opts);
  },

  driver: function(opts) {
    return new Driver(opts);
  }
};
