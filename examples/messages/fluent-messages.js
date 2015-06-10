"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("sphero", { adaptor: "sphero", port: "/dev/rfcomm0" })
  .device("sphero", { driver: "sphero" })
  .on("ready", function(bot) {
    console.log("Setting up Collision Detection...");

    bot.sphero.on("update", function(data) {
      console.log("Update event eventName: " + data + " ");
      console.log("Update event args: ");
      console.log(data);
    });

    bot.sphero.on("data", function(data) {
      bot.sphero.color(0x00FFFF);
      console.log("Data event args: ");
      console.log(data);
    });

    bot.sphero.on("response", function(data) {
      bot.sphero.color(0x0000FF);
      console.log("Response:");
      console.log(data);
    });

    bot.sphero.on("collision", function(data) {
      bot.sphero.color(0xFFDD00);
      console.log("Collision:");
      console.log(data);
    });

    bot.sphero.on("async", function(data) {
      bot.sphero.color(0xFF0000);
      console.log("Async:");
      console.log(data);
    });

    bot.sphero.detectCollisions();
    bot.sphero.color(0x00FF00);
  });

Cylon.start();
