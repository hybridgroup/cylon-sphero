"use strict";

var Cylon = require("cylon");

Cylon.api({
  host: "0.0.0.0",
  port: "8080",
  ssl: false
});

Cylon.robot({
  name: "pebble",

  connections: {
    sphero: { adaptor: "sphero", port: "/dev/tty.Sphero-YBW-RN-SPP" },
    pebble: { adaptor: "pebble" }
  },

  devices: {
    sphero: { driver: "sphero", connection: "sphero" },
    pebble: { driver: "pebble", connection: "pebble" }
  },

  heading: 0,
  speed: 0,

  work: function(my) {
    every((0.1).second(), function() {
      my.sphero.roll(my.speed, my.heading);
    });

    my.pebble.on("accel", function(data) {
      var values = data.split(","),
          x = values[0],
          y = values[1];

      my.speed = Math.round(Math.max(Math.abs(x) / 6, Math.abs(y) / 6));

      my.heading = Math.round(
        ((180.0 - (Math.atan2(y, x) * (180.0 / Math.PI))))
      );
    });
  }

});

Cylon.start();
