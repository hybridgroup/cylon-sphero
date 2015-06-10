"use strict";

var Cylon = require("cylon");

Cylon.api({
  host: "0.0.0.0",
  port: "8080",
  ssl: false
});

Cylon
  .robot({ heading: 0, speed: 0 })
  .connection("sphero", { adaptor: "sphero", port: "/dev/rfcomm0" })
  .connection("pebble", { adaptor: "pebble" })
  .device("sphero", { driver: "sphero", connection: "sphero" })
  .device("pebble", { driver: "pebble", connection: "pebble" })
  .on("ready", function(bot) {
    setInterval(function() {
      bot.sphero.roll(bot.speed, bot.heading);
    }, 100);

    bot.pebble.on("accel", function(data) {
      var values = data.split(","),
          x = values[0],
          y = values[1];

      bot.speed = Math.round(Math.max(Math.abs(x) / 6, Math.abs(y) / 6));

      bot.heading = Math.round(
        ((180.0 - (Math.atan2(y, x) * (180.0 / Math.PI))))
      );
    });
  });

Cylon.start();
