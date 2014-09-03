var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm0' },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(my) {
    var color = 0x00FF00,
        bitFilter = 0xFFFF00;

    after((1).seconds(), function() {
      console.log("Setting up Collision Detection...");
      my.sphero.detectCollisions();
      // To detect locator, accelOne and velocity from the sphero
      // we use setDataStreaming.
      // sphero API data sources for locator info are as follows:
      // ['locator', 'accelOne', 'velocity']
      // It is also possible to pass an opts object to setDataStreaming():
      var opts = {
        // n: int, divisor of the max sampling rate, 400 hz/s
        // n = 40 means 400/40 = 10 data samples per second,
        // n = 200 means 400/200 = 2 data samples per second
        n: 200,
        // m: int, number of data packets buffered before passing them to the stream
        // m = 10 means each time you get data it will contain 10 data packets
        // m = 1 is usually best for real time data readings.
        m: 1,
        // pcnt: 1 -255, how many packets to send.
        // pcnt = 0 means unlimited data Streaming
        // pcnt = 10 means stop after 10 data packets
        pcnt: 0,
      };
      my.sphero.setDataStreaming(['locator', 'accelOne', 'velocity'], opts);
      // SetBackLED turns on the tail LED of the sphero that helps
      // identify the direction the sphero is heading.
      // accepts a param with a value from 0 to 255, led brightness.
      my.sphero.setBackLED(192);
      my.sphero.setRGB(color);
      my.sphero.stop();
    });

    my.sphero.on('data', function(data) {
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
