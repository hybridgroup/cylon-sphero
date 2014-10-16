var cylon = require('cylon');

cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm0' },
  device: { name: 'sphero', driver: 'sphero' }
})

.on('ready', function(robot) {
  setInterval(function() {
    robot.sphero.roll(60, Math.floor(Math.random() * 360));
  }, 1000);
})

.start();

