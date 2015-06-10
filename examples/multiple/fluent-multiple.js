"use strict";

var Cylon = require("cylon");

var bots = [
  { name: "Thelma", port: "/dev/rfcomm0" },
  { name: "Louise", port: "/dev/rfcomm1" }
];

bots.forEach(function(bot) {
  Cylon
    .robot({ name: bot.name })
    .connection("sphero", { adaptor: "sphero", port: bot.port })
    .device("sphero", { driver: "sphero" })
    .on("ready", function(robot) {
      setInterval(function() {
        console.log(robot.name);
        robot.sphero.randomColor();
        robot.sphero.roll(60, Math.floor(Math.random() * 360));
      }, 1000);
    });
});

Cylon.start();
