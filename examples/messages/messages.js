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
    console.log("Setting up Collision Detection...");

    me.sphero.on("update", function(data) {
      console.log("Update event eventName: " + data + " ");
      console.log("Update event args: ");
      console.log(data);
    });

    me.sphero.on("data", function(data) {
      me.sphero.color(0x00FFFF);
      console.log("Data event args: ");
      console.log(data);
    });

    me.sphero.on("response", function(data) {
      me.sphero.color(0x0000FF);
      console.log("Response:");
      console.log(data);
    });

    me.sphero.on("collision", function(data) {
      me.sphero.color(0xFFDD00);
      console.log("Collision:");
      console.log(data);
    });

    me.sphero.on("async", function(data) {
      me.sphero.color(0xFF0000);
      console.log("Async:");
      console.log(data);
    });

    me.sphero.detectCollisions();
    me.sphero.color(0x00FF00);
  }
}).start();
