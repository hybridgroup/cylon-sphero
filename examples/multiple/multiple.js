"use strict";

var Cylon = require("cylon");

var bots = [
  { name: "Thelma", port: "/dev/rfcomm0" },
  { name: "Louise", port: "/dev/rfcomm1" }
];

bots.forEach(function(bot) {
  Cylon.robot({
    name: bot.name,

    connections: {
      sphero: { adaptor: "sphero", port: bot.port }
    },

    devices: {
      sphero: { driver: "sphero" }
    },

    work: function(my) {
      every((1).second(), function() {
        console.log(my.name);
        my.sphero.randomColor();
        my.sphero.roll(60, Math.floor(Math.random() * 360));
      });
    }
  });
});

Cylon.start();
