"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("sphero", { adaptor: "sphero", port: "/dev/rfcomm0" })
  .device("sphero", { driver: "sphero" })

  .on("ready", function(bot) {
    var color = 0x00FF00,
        bitFilter = 0xFFFF00;

    setTimeout(function() {
      console.log("Setting up Collision Detection...");
      bot.sphero.detectCollisions();
      bot.sphero.setRGB(color);
      bot.sphero.stop();
    }, 1000);

    bot.sphero.on("collision", function() {
      console.log("Collision:");
      color = color ^ bitFilter;
      console.log("Color: " + (color.toString(16)) + " ");
      bot.sphero.setRGB(color);
      bot.sphero.roll(90, Math.floor(Math.random() * 360));
    });
  });

Cylon.start();
