# Sphero Messages

For this Cylon example, we're going to hook up to a Sphero, and respond to
a number of events the Sphero adaptor is capable of emitting. Before we get
started, make sure you've got the `cylon-sphero` module installed.

To get started, let's import the Cylon module:

    var Cylon = require('cylon');

With that set up, we can start defining our robot:

    Cylon.robot({

As with other Sphero examples, we'll have one connection and one device, both
the same Sphero.

      connections: {
        sphero: { adaptor: 'sphero', port: '/dev/rfcomm0' }
      },

      devices: {
        sphero: { driver: 'sphero' }
      },

And now we can start defining our robot's work.

      work: function(bot) {

        console.log("Setting up Collision Detection...");

First we add our listeners, when the Sphero emits an 'update' event, we want to
log the data it's provided to us:
        bot.sphero.on("update", function(data) {
          console.log("Update event eventName: " + data + " ");
          console.log("Update event args: ");
          console.log(data);
        });

Similarly, when we get `data` from the Sphero, we want to log it, but
we'll also change it's color while we're at it.

        bot.sphero.on("data", function(data) {
          bot.sphero.color(0x00FFFF);
          console.log("Data event args: ");
          console.log(data);
        });

We also display the payload for `response` events, this are triggered when we get a
response from a command back.

        bot.sphero.on("response", function(data) {
          bot.sphero.color(0x0000FF);
          console.log("Response:");
          console.log(data);
        });

In the event of a collision, we want to change the color of the Sphero again, as
well as logging the data provided by the collision event.

        bot.sphero.on("collision", function(data) {
          bot.sphero.color(0xFFDD00);
          console.log("Collision:");
          console.log(data);
        });

And, last but not least, when we get an `async` event every time sphero streams
asynchronous data.

        bot.sphero.on("async", function(data) {
          bot.sphero.color(0xFF0000);
          console.log("Async:");
          console.log(data);
        });

After addinr our listeners, we want to set up collision detection and change
it's color.

        bot.sphero.detectCollisions();
        bot.sphero.color(0x00FF00);

      }

And with all that done, we can finally start the robot.

    }).start();
