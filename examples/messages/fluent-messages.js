"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("sphero", { adaptor: "sphero", port: "/dev/rfcomm0" })
  .device("sphero", { driver: "sphero" })
  .on("ready", function(bot) {
    setTimeout(function() {
      console.log("Setting up Collision Detection...");
      bot.sphero.detectCollisions();
      bot.sphero.setRGB(0x00FF00);
    }, 1000);

    bot.sphero.on("update", function(data) {
      console.log("Update event eventName: " + data + " ");
      console.log("Update event args: ");
      console.log(data);
    });

    bot.sphero.on("message", function(data) {
      bot.sphero.setRGB(0x0000FF);
      console.log("Message:");
      console.log(data);
    });

    bot.sphero.on("collision", function(data) {
      bot.sphero.setRGB(0xFF0000);
      console.log("Collision:");
      console.log(data);
    });

    bot.sphero.on("notification", function(data) {
      bot.sphero.setRGB(0xFF0000);
      console.log("Notification:");
      console.log(data);
    });
  });

Cylon.start();
