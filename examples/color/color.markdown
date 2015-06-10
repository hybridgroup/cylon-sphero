# Sphero Color

This Cylon example will connect to a Sphero, and change it's color randomly
every second. Before we start, ensure you've got the `cylon-sphero` module
installed.

To get started, let's import the Cylon module:

    var Cylon = require('cylon');

Now we can start defining our robot.

    Cylon.robot({

Our robot will have, as with other Sphero examples, one connection and one
device, both to the same Sphero.

      connections: {
        sphero: { adaptor: 'sphero', port: '/dev/rfcomm0' }
      },

      devices: {
        sphero: { driver: 'sphero' }
      },

The work our robot will be performing is fairly, straightforward, it will just
be changing it's color to a random new color every second.

      work: function(me) {
        every((1).second(), function() {
          // We tell spherot o change the color of its
          // RGB LED to a random value.
          // We can also use `my.sphero.color(0x00FF00);`
          // if we want an specific color.
          my.sphero.randomColor();
        });
      }

And with the pieces in place, we can start our robot!

    }).start();
