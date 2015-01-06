"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    sphero: { adaptor: "sphero", port: "/dev/rfcomm0" }
  },

  devices: {
    sphero: { driver: "sphero" }
  },

  work: function(me) {
    every((1).second(), function() {
      me.sphero.setRGB(Math.floor(Math.random() * 100000));
    });
  }
}).start();
