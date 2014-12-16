# Sphero + Pebble

For this Cylon example, we're going to hook up to a Sphero,
and control it using pebble accelerometer.

Before we get started, make sure you've got the `cylon-sphero` module installed.

To get started, let's import the Cylon module:

    var Cylon = require('cylon');

Then we setup API to listen on port 8080:

    Cylon.api({
      host: '0.0.0.0',
      port: '8080',
      ssl:  false
    });

With that set up, we can start defining our robot:

    Cylon.robot({

We setup connections an devices for sphero and pebble:

    connections: {
      sphero: { adaptor: 'sphero', port: '/dev/tty.Sphero-YBW-RN-SPP' },
      pebble: { adaptor: 'pebble' }
    },

    devices: {
      sphero: { driver: 'sphero' },
      pebble: { driver: 'pebble' }
    },

Then we create and set variable heading and speed to 0:

    heading: 0,
    speed:  0,

And now we can start defining our robot's work.

    work: function(my) {

Every second we will change update sphero direction using calculated heading value:

    every((0.1).second(), function() {
      my.sphero.roll(100, my.heading);
    });

When we receive data from pebble accelerometer we calculate new heading value:

    my.pebble.on('accel', function(data) {
      values = data.split(",");
      x      = values[0];
      y      = values[1];


      my.speed   = Math.round(Math.max(Math.abs(x)/6, Math.abs(y)/6));
      my.heading = Math.round(((180.0 - (Math.atan2(y,x) * (180.0 / Math.PI)))));
    });

And with all that done, we can finally start the robot.

    }).start();
