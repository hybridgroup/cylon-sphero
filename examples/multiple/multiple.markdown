# Multiple Sphero


Let's do an example of Cylon controlling multiple Spheros at the same time.
The Spheros will both randomly roll around and change their colors every second.

Before we run this example, make sure to have `cylon-sphero` installed (`npm install cylon-sphero`)

First, load up Cylon:

    var Cylon = require('cylon');

Next up, let's define what's different about our bots so we can tell them apart
later on. We'll give them each a different name, and define their connection
ports.

    var bots = [
      { name: "Thelma", port: "/dev/rfcomm0" },
      { name: "Louise", port: "/dev/rfcomm1" }
    ];

With our different bots described in code, let's start telling Cylon about them:

    bots.forEach(function(bot) {
      Cylon.robot({
        name: bot.name,

Next up, let's tell the robot about the Sphero's port:

        connections: {
          sphero: { adaptor: 'sphero', port: bot.port }
        },

Spheros will both have the same device configuration:

        devices: {
          sphero: { driver: 'sphero' }
        },

Now we can define the work for the Spheros.
Every second, they'll print their name, change to a random color, and roll in a random direction.

        work: function(my) {
          every((1).second(), function() {
            console.log(my.name);
            my.sphero.randomColor();
            my.sphero.roll(60, Math.floor(Math.random() * 360));
          });
        }
      });
    });

And with our robots defined, we'll start up Cylon.

    Cylon.start();
