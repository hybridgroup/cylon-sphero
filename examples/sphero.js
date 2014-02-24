var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm0' },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(self) {
    every((1).second(), function() {
      self.sphero.roll(60, Math.floor(Math.random() * 360), 1);
    });
  }
}).start();
