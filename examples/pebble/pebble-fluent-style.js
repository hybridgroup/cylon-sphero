var cylon = require('cylon');

cylon.api({
  host: '0.0.0.0',
  port: '8080',
  ssl:  false
});

cylon.robot({
  name: 'pebble',
  connections: {
    sphero: { adaptor: 'sphero', port: '/dev/tty.Sphero-YBW-RN-SPP' },
    pebble: { adaptor: 'pebble' }
  },

  devices: {
    sphero: { driver: 'sphero', connection: 'sphero' },
    pebble: { driver: 'pebble', connection: 'pebble' }
  },

  heading: 0,
  speed:   0
})

.on('ready', function(robot) {
  setInterval(function() {
    robot.sphero.roll(robot.speed, robot.heading);
  }, 100);

  robot.pebble.on('accel', function(data) {
    var values = data.split(","),
        x      = values[0],
        y      = values[1];

    robot.speed   = Math.round(Math.max(Math.abs(x)/6, Math.abs(y)/6));
    robot.heading = Math.round(((180.0 - (Math.atan2(y,x) * (180.0 / Math.PI)))));
  });
})

.start();
