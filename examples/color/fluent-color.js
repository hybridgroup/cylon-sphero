"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("sphero", { adaptor: "sphero", port: "/dev/rfcomm0" })
  .device("sphero", { driver: "sphero" })
  .on("ready", function(bot) {
    setInterval(function() {
      bot.sphero.setRGB(Math.floor(Math.random() * 100000));
    }, 1000);
  });

Cylon.start();
