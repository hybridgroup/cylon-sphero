"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("sphero", { adaptor: "sphero", port: "/dev/rfcomm0" })
  .device("sphero", { driver: "sphero" })
  .on("ready", function(my) {
    every((1).second(), function() {
      // We tell sphero to change the color of its
      // RGB LED to a random value.
      // We can also use `my.sphero.color(0x00FF00);`
      // if we want an specific color.
      my.sphero.randomColor();
    });
  });

Cylon.start();
