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
      // The data sources available for data streamming from the
      // sphero API are as follows:
      // ['motorsPWM', 'imu', 'accelerometer', 'gyroscope', 'motorsIMF'
      //  'quaternion', 'locator', 'accelOne', 'velocity']
      my.sphero.setDataStreamming(['motorsPWM', 'imu', 'accelerometer', 'gyroscope']);
      my.sphero.setRGB(color);
      my.sphero.stop();
    });

    my.sphero.on('data', function(data) {
      console.log("data:");
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
