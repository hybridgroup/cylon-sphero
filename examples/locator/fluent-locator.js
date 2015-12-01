"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("sphero", { adaptor: "sphero", port: "/dev/rfcomm0" })
  .device("sphero", { driver: "sphero" })
  .on("ready", function(bot) {
    console.log("Setting up Locator...");

    // To detect location from the Sphero we use configureLocator.
    // You must pass an opts object to configureLocator():
    var opts = {
      flags: 0x01,
      x: 0x0000,
      y: 0x0000,
      yawTare: 0x0
    };

    bot.sphero.configureLocator(opts);

    every((1).second(), function() {
      bot.sphero.readLocator(function(err, data) {
        if (err) {
          console.log("err:", err);
        } else {
          console.log(data);
        }
      });
    });
  });

Cylon.start();
