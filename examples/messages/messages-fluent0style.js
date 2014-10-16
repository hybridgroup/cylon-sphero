var cylon = require('cylon');

cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm0' },
  device: { name: 'sphero', driver: 'sphero' }
})

.on('ready', function(robot) {
  setTimeout(function() {
    console.log("Setting up Collision Detection...");
    robot.sphero.detectCollisions();
    robot.sphero.setRGB(0x00FF00);
  }, 1000);

  robot.sphero.on('update', function(data) {
    console.log("Update event eventName: " + data + " ");
    console.log("Update event args: ");
    console.log(data);
  });

  robot.sphero.on('message', function(data) {
    robot.sphero.setRGB(0x0000FF);
    console.log("Message:");
    console.log(data);
  });

  robot.sphero.on('collision', function(data) {
    robot.sphero.setRGB(0xFF0000);
    console.log("Collision:");
    console.log(data);
  });

  robot.sphero.on('notification', function(data) {
    robot.sphero.setRGB(0xFF0000);
    console.log("Notification:");
    console.log(data);
  });
})

.start();
