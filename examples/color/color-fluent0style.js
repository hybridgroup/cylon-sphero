var cylon = require('cylon');

cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm0' },
  device: { name: 'sphero', driver: 'sphero' }
})

.on('ready', function(robot) {
  setInterval(function() {
    robot.sphero.setRGB(Math.floor(Math.random() * 100000));
  }, 1000);
})

.start();
