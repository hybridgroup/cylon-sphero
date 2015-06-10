"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    sphero: { adaptor: "sphero", port: "/dev/rfcomm0" }
  },

  devices: {
    sphero: { driver: "sphero" }
  },

  work: function(my) {
    var max = 0;
    var changingColor = false;

    my.sphero.setDataStreaming({
      n: 40, m: 1, pcnt: 0, dataSources: ["velocity"]
    });

    my.sphero.on("dataStreaming", function(data) {
      if (!changingColor) {
        var x = Math.abs(data.xVelocity.value),
            y = Math.abs(data.yVelocity.value);

        if (x > max) {
          max = x;
        }

        if (y > max) {
          max = y;
        }
      }
    });

    every((0.6).second(), function() {
      changingColor = true;

      if (max < 10) {
        my.sphero.color("white");
      } else if (max < 100) {
        my.sphero.color("lightyellow");
      } else if (max < 150) {
        my.sphero.color("yellow");
      } else if (max < 250) {
        my.sphero.color("orange");
      } else if (max < 350) {
        my.sphero.color("orangered");
      } else if (max < 450) {
        my.sphero.color("red");
      } else {
        my.sphero.color("darkred");
      }

      max = 0;
      changingColor = false;
    });

  }
}).start();
