# Sphero Collisions

For this Cylon example, we're going to set up a Sphero such that it will change
it's color and roll in a random direction when it has a collision.

Before we get started, make sure you have the `cylon-sphero` module installed.

First, let's load up Cylon:

    var Cylon = require('cylon');

With that loaded, we can begin defining our robot.

    Cylon.robot({

We're going to have one connection, and one device for this robot, both the same
Sphero.

      connections: {
        sphero: { adaptor: 'sphero', port: '/dev/rfcomm0' }
      },

      devices: {
        sphero: { driver: 'sphero' }
      },

With the necessary hardware defined, we can now start telling Cylon about the
work our robot will be performing.

      work: function(me) {

We'll assign some variables here for later, a basic color for our sphero and
a variable we'll use for a bitwise math operation later.

        var color = 0x00FF00,
            bitFilter = 0xFFFF00;

        console.log("Setting up Collision Detection...");

We add a listener on `collision`, since we want to be notified when our Sphero detects a collision.

        me.sphero.on('collision', function(data) {
          console.log("Collision:");

We get the new color for a Sphero by doing a bitwise XOR operation on it, using
the bitfilter above.

          color = color ^ bitFilter;

With our new color in hand, we can let the user know what color we're using now,
and change the Sphero to that color. We'll also tell the Sphero to roll in
a random direction, at speed 90.

          console.log("Color: " + (color.toString(16)) + " ");
          me.sphero.color(color);
          me.sphero.roll(90, Math.floor(Math.random() * 360));
        });
      }

Once the `collision` listener is been added, we change the color and start detecting collisions.

      me.sphero.color(color);
      me.sphero.detectCollisions();

And with all that said and done, we can now start the robot.

    }).start();
