var cylon = require('cylon');

cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm0' },
  device: { name: 'sphero', driver: 'sphero' }
})

.on('ready', function(robot) {
  var color = 0x00FF00,
      bitFilter = 0xFFFF00;

  setTimeout(function() {
    console.log("Setting up Collision Detection...");
    robot.sphero.detectCollisions();
    robot.sphero.setRGB(color);
    robot.sphero.stop();
  }, 1000);

  robot.sphero.on('collision', function(data) {
    console.log("Collision:");
    color = color ^ bitFilter;
    console.log("Color: " + (color.toString(16)) + " ");
    robot.sphero.setRGB(color);
    robot.sphero.roll(90, Math.floor(Math.random() * 360));
  });
})

.start();
