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
    var color = 0x00FF00,
        bitFilter = 0xFFFF00;

    console.log("Setting up Collision Detection...");

    me.sphero.on("collision", function() {
      console.log("Collision:");
      color = color ^ bitFilter;
      console.log("Color: " + (color.toString(16)) + " ");
      me.sphero.color(color);
      me.sphero.roll(90, Math.floor(Math.random() * 360));
    });

    me.sphero.color(color);
    me.sphero.detectCollisions();
  }
}).start();
