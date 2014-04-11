var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm1' },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(my) {
    var color = 0x00FF00,
        bitFilter = 0xFFFF00;

    my.sphero.on('connect', function() {
      console.log("Setting up Collision Detection...");
      my.sphero.detectCollisions();
      my.sphero.detectLocator();
      my.sphero.setRGB(color);
      my.sphero.stop();
    });

    my.sphero.on('locator', function(data) {
      console.log("locator:");
      console.log(data);
    });

    my.sphero.on('collision', function(data) {
      console.log("Collision:");
      color = color ^ bitFilter;
      console.log("Color: " + (color.toString(16)) + " ");
      my.sphero.setRGB(color);
      my.sphero.roll(128, Math.floor(Math.random() * 360));
    });

  }
}).start();
